import { IsEnum, IsUUID } from "class-validator";
import { OrderStatusList } from "../enum/order.enum";
import { OrderStatus } from "generated/prisma";

export class changeOrderStatusDto{
  @IsUUID(4)
  id: string;
  
  @IsEnum(OrderStatusList, {
    message: `Valid status are ${OrderStatusList}`
  })
  status: OrderStatus;
}
