import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
    HttpStatus,
  } from '@nestjs/common';
  
  @Catch()
  export class AllExceptionsFilter implements ExceptionFilter {
    catch(exception: unknown, host: ArgumentsHost) {
      const ctx = host.switchToHttp();
      const response = ctx.getResponse();
      const request = ctx.getRequest();
  
      let status =
        exception instanceof HttpException
          ? exception.getStatus()
          : HttpStatus.INTERNAL_SERVER_ERROR;
  
      let message =
        exception instanceof HttpException
          ? exception.getResponse()['message']
          : 'Internal server error';
  
      response.status(status).json({
        Success: false,
        Message: 'Failed to handle the request',
        Error: {
          Code: status,
          Message: message,
        },
      });
    }
  }
  