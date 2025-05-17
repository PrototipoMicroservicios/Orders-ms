import {
  Catch,
  ArgumentsHost,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';

@Catch(RpcException)
export class RpcCustomExceptionFilter implements ExceptionFilter {
  catch(exception: RpcException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    const rpcError = exception.getError(); // ✅ Esto está bien si exception es RpcException

    console.log({ rpcError });

    response.status(401).json({
      status: 401,
      message: rpcError || 'PRUEBA',
    });
  }
}
