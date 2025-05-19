import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { envs } from 'src/config';
import { options } from 'joi';

@Module({
  controllers: [OrdersController],
  providers: [OrdersService],
  imports:[
    ClientsModule.register([

      {
        name: 'PRODUCT_SERVICE',
        transport: Transport.TCP,
        options:{
          host: envs.ProductsMicroserviceHost,
          port: envs.ProductsMicroservicePort,
        }

      }

    ])

  ]
})
export class OrdersModule {}
