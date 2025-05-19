import { ArrayMinSize, IsArray, IsBoolean, IsEnum, IsNumber, IsOptional, IsPositive, ValidateNested } from "class-validator";
import { OrderStatus } from "generated/prisma";
import { OrderStatusList } from "../enum/order.enum";
import { OrderItemDto } from "./order-item.dto";
import { Type } from "class-transformer";

export class CreateOrderDto {
    
@IsArray()
@ArrayMinSize(1)
@ValidateNested({each:true})
@Type(() => OrderItemDto)
items: OrderItemDto[]

}
