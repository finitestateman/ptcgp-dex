import { Module } from '@nestjs/common';
import { AttacksService } from './attacks.service';
import { AttacksController } from './attacks.controller';

@Module({
    controllers: [AttacksController],
    providers: [AttacksService],
})
export class AttacksModule {}
