import {
    ArgumentsHost,
    Catch,
    ExceptionFilter,
    HttpStatus,
} from '@nestjs/common';
import {
    Request as ExpressRequest,
    Response as ExpressResponse,
} from 'express';
import { PostgresError } from 'pg-error-enum';
import { QueryFailedError } from 'typeorm';

@Catch(QueryFailedError)
export class QueryFailedErrorFilter<T extends QueryFailedError>
    implements ExceptionFilter
{
    catch(exception: T, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const request = ctx.getRequest<ExpressRequest>();
        const response = ctx.getResponse<ExpressResponse>();

        if (
            'code' in exception &&
            exception.code === PostgresError.UNIQUE_VIOLATION
        ) {
            response.status(HttpStatus.CONFLICT).json({
                message: 'Resource already exists',
                error: 'Conflict',
                statusCode: HttpStatus.CONFLICT,
                path: request.url,
            });
        } else {
            response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                message: 'Query Failed',
                statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
                path: request.url,
            });
        }
    }
}
