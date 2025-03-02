import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as Joi from 'joi';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { DOTENV } from './common/const/env.const';
import { QueryFailedErrorFilter } from './common/filters/query-failed-error.filter';
import { PokemonsModule } from './pokemons/pokemons.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            validationSchema: Joi.object({
                'DB-TYPE': Joi.string().valid('postgres').required(),
                'DB-HOST': Joi.string().required(),
                'DB-PORT': Joi.number().required(),
                'DB-USERNAME': Joi.string().required(),
                'DB-PASSWORD': Joi.string().required(),
                'DB-DATABASE': Joi.string().required(),
            }),
        }),
        TypeOrmModule.forRootAsync({
            useFactory: (configService: ConfigService) => ({
                type: configService.get<'postgres'>(DOTENV.DB.TYPE),
                host: configService.get<string>(DOTENV.DB.HOST),
                port: configService.get<number>(DOTENV.DB.PORT),
                username: configService.get<string>(DOTENV.DB.USERNAME),
                password: configService.get<string>(DOTENV.DB.PASSWORD),
                database: configService.get<string>(DOTENV.DB.DATABASE),
                schema: 'public',
                entities: ['dist/**/entities/*.entity{.ts,.js}'],
                synchronize: true,
                logging: true,
                autoLoadEntities: true,
                namingStrategy: new SnakeNamingStrategy(),
            }),
            inject: [ConfigService],
        }),
        PokemonsModule,
    ],
    controllers: [],
    providers: [
        {
            provide: APP_FILTER,
            useClass: QueryFailedErrorFilter,
        },
    ],
})
export class AppModule {}
