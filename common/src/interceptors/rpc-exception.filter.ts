import { Observable, throwError } from 'rxjs';
import { RpcException } from '@nestjs/microservices';
import { ArgumentsHost, Catch, Injectable, RpcExceptionFilter } from '@nestjs/common';

@Catch(RpcException)
export class AllExceptionsFilter implements RpcExceptionFilter<RpcException> {
    catch(exception: RpcException, host: ArgumentsHost): Observable<any> {
        console.log('exception', exception);
        const error = exception.getError() as { code?: string; message?: string };
        console.log('error', error);

        // Check if error is an object and has a 'code' property
        // Check if error is a string or has a 'message' property
        const statusCode = typeof error === 'object' && error.hasOwnProperty('code') ? error['code'] : 500;
        const message =
            typeof error === 'string'
                ? error
                : error.hasOwnProperty('message')
                ? error['message']
                : 'An unexpected error occurred';

        return throwError(() => ({
            statusCode: statusCode,
            message: message,
        }));
    }
}
