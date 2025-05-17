import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { envs } from './config';
import { Console } from 'console';
import { Logger, ValidationPipe } from '@nestjs/common';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  
  const logger = new Logger('Orders-Main');
  const app = await NestFactory.createMicroservice(AppModule,{
    transport: Transport.TCP,
    options:{
      port:envs.port
    }
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist:true,
      forbidNonWhitelisted: true,
    })
  )

  await app.listen();
  Logger.log(`Microservice running on port ${envs.port}`);

}
bootstrap();
