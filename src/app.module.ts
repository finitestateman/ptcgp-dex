import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as Joi from 'joi';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DOTENV } from './common/const/env.const';

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
                entities: ['src/**/*.entity{.ts,.js}'],
                synchronize: true,
                logging: true,
            }),
            inject: [ConfigService],
        }),
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
