import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { envs } from './config';
import { Console } from 'console';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  
  const logger = new Logger('Orders-Main');
  const app = await NestFactory.create(AppModule);
  await app.listen(envs.port);
  Logger.log(`Microservice running on port ${envs.port}`);

}
bootstrap();
