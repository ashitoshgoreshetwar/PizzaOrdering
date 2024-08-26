import {
    CallHandler,
    ExecutionContext,
    Injectable,
    NestInterceptor,
  } from '@nestjs/common';
  import { Observable } from 'rxjs';
  import { map } from 'rxjs/operators';
  import { SetMetadata } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

  export const SUCCESS_MESSAGE_KEY = 'successMessage';
  export const SuccessMessage = (message: string) => SetMetadata(SUCCESS_MESSAGE_KEY, message);

  
  @Injectable()
  export class ResponseInterceptor implements NestInterceptor 
  {
    constructor(private reflector: Reflector) {}
    r
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> 
    {
      const successMessage = this.reflector.get<string>(SUCCESS_MESSAGE_KEY, context.getHandler());
      return next.handle().pipe(
        map((data) => ({
          Success: true,
          Message: successMessage || 'Successfully handled the request',
          Data: Array.isArray(data) ? data : [data],
        })),
      );
    }
  }