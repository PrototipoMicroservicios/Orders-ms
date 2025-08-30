import {Catch,ArgumentsHost, ExceptionFilter, HttpStatus} from '@nestjs/common';

import { RpcException } from '@nestjs/microservices';

type RpcErrorPayload = {
  status?: number | string;
  message?: any;
  [key: string]: any;
};

// Type guard para narrowear el unknown de getError()
function isRpcErrorPayload(x: unknown): x is RpcErrorPayload {
  return typeof x === 'object' && x !== null && ('status' in (x as any) || 'message' in (x as any));
}

@Catch(RpcException)
export class RpcCustomExceptionFilter implements ExceptionFilter {
  catch(exception: RpcException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    const rpcErrorUnknown: unknown = exception.getError();

    if (isRpcErrorPayload(rpcErrorUnknown)) {
      // Normaliza el status (acepta number o string) y valida rango HTTP
      const parsed = Number(rpcErrorUnknown.status);
      const status =
        Number.isFinite(parsed) && parsed >= 100 && parsed <= 599
          ? parsed
          : HttpStatus.BAD_REQUEST;

      // Devuelve el payload original sin enmascarar, asegurando status numérico
      return response.status(status).json({
        ...(rpcErrorUnknown as object),
        status, // sobreescribe si venía como string
      });
    }

    // Si el microservicio lanzó un string u otra cosa
    const message =
      typeof rpcErrorUnknown === 'string' ? rpcErrorUnknown : 'RPC error';

    return response.status(HttpStatus.BAD_REQUEST).json({
      status: HttpStatus.BAD_REQUEST,
      message,
    });
  }
}