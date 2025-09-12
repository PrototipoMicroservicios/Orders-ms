import { Controller, Logger, ParseUUIDPipe } from '@nestjs/common';
import { EventPattern, MessagePattern, Payload, Ctx, NatsContext } from '@nestjs/microservices';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderPaginationDto } from './dto/order-pagination.dto';
import { changeOrderStatusDto, PaidOrderDto } from './dto';

@Controller()
export class OrdersController {
  //private readonly logger = new Logger(OrdersController.name);
  constructor(private readonly ordersService: OrdersService) { }

  @MessagePattern('createOrder')
  async create(@Payload() createOrderDto: CreateOrderDto) {
    const order = await this.ordersService.create(createOrderDto);
    const paymentSession = await this.ordersService.createPaymentSession(order);
    return { order, paymentSession };
  }

  @MessagePattern('findAllOrders')
  findAll(@Payload() orderPaginationDto: OrderPaginationDto) {
    return this.ordersService.findAll(orderPaginationDto);
  }

  @MessagePattern('findOneOrder')
  findOne(@Payload('id', ParseUUIDPipe) id: string) {
    return this.ordersService.findOne(id);
  }

  @MessagePattern('changeOrderStatus')
  changeOrderStatus(@Payload() changeOrderStatusDto: changeOrderStatusDto) {
    return this.ordersService.changeStatus(changeOrderStatusDto)
  }


  // ====== EVENTOS ======

  @EventPattern('payment.succeeded')
  paidOrder(@Payload() paidOrderDto: PaidOrderDto) {
    return this.ordersService.paidOrder(paidOrderDto);
  }


}