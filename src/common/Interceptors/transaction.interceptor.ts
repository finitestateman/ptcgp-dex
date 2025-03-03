import {
    CallHandler,
    ExecutionContext,
    Injectable,
    NestInterceptor,
} from '@nestjs/common';
import { Request as ExpressRequest } from 'express';
import { Observable, catchError, from, tap } from 'rxjs';
import { DataSource, QueryRunner } from 'typeorm';

@Injectable()
export class TransactionInterceptor implements NestInterceptor {
    public constructor(private readonly dataSource: DataSource) {}

    public async intercept(
        context: ExecutionContext,
        next: CallHandler<any>,
    ): Promise<Observable<any>> {
        const request: ExpressRequest & { queryRunner: QueryRunner } = context
            .switchToHttp()
            .getRequest<ExpressRequest & { queryRunner: QueryRunner }>();

        const qr = this.dataSource.createQueryRunner();

        await qr.connect();
        await qr.startTransaction();

        request.queryRunner = qr;

        return next.handle().pipe(
            tap(() =>
                from(
                    (async (): Promise<void> => {
                        await qr.commitTransaction();
                        await qr.release();
                    })(),
                ),
            ),
            catchError((e) =>
                from(
                    (async (): Promise<void> => {
                        await qr.rollbackTransaction();
                        await qr.release();
                        throw e;
                    })(),
                ),
            ),
        );
    }
}
