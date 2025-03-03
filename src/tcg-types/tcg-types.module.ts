import { Module } from '@nestjs/common';
import { TcgTypesController } from './tcg-types.controller';
import { TcgTypesService } from './tcg-types.service';

@Module({
    controllers: [TcgTypesController],
    providers: [TcgTypesService],
})
export class TcgTypesModule {}
