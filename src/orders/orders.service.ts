import { HttpStatus, Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { PrismaClient } from 'generated/prisma';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { OrderPaginationDto } from './dto/order-pagination.dto';
import { changeOrderStatusDto } from './dto';
import { firstValueFrom, Observable } from 'rxjs';
import { PRODUCT_SERVICE } from 'src/config/service';

@Injectable()
export class OrdersService extends PrismaClient implements OnModuleInit {

  private readonly logger = new Logger('OrdersService');

  constructor(
    @Inject(PRODUCT_SERVICE) private readonly productsClient: ClientProxy,
  ) {
    super();
  }

  async onModuleInit() {
    await this.$connect();
    this.logger.log('Data_Base_connected');
  }

  async create(createOrderDto: CreateOrderDto) {
    const ids = [5,6];
    const products = await firstValueFrom(
      this.productsClient.send({cmd: 'validate_products'}, ids)
    )
    return products;
    //return {
      //service: 'Orders Microservice',
      //createOrderDto: createOrderDto,
    //}


    //return this.order.create({
     // data: createOrderDto
    //})
  }

  async findAll(orderPaginationDto: OrderPaginationDto) {
      const totalPage = await this.order.count({
        where:{
          status: orderPaginationDto.status
        }
      });
  

      const currentPage = Number(orderPaginationDto.page) || 1;
      const perPage = orderPaginationDto.limit;

       return {
      data: await this.order.findMany({
        skip: ( currentPage - 1 ) * perPage,
        take: perPage,
        where: {
          status: orderPaginationDto.status
        }
      }),
      meta: {
        total: totalPage,
        page: currentPage,
        lastPage: Math.ceil( totalPage / perPage )
      }
    }
  }
  

   async findOne(id: string) {

    const order = await this.order.findFirst({
      where: { id }
    });

    if ( !order ) {
      throw new RpcException({ 
        status: HttpStatus.NOT_FOUND, 
        message: `Order with id ${ id } not found`
      });
    }

    return order;

  }

  async changeStatus(changeOrderStatusDto: changeOrderStatusDto){
    const {id, status} = changeOrderStatusDto;
    const order = await this.findOne(id);
    if(order.status === status){
      return order;
    }

    return this.order.update({
      where: {id},
      data: {status: status}
    });
  }

}
function firtsValueFrom(arg0: Observable<any>) {
  throw new Error('Function not implemented.');
}

