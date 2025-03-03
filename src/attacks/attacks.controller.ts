import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
} from '@nestjs/common';
import { AttacksService } from './attacks.service';
import { CreateAttackDto } from './dto/create-attack.dto';
import { UpdateAttackDto } from './dto/update-attack.dto';

@Controller('attacks')
export class AttacksController {
    constructor(private readonly attacksService: AttacksService) {}

    @Post()
    create(@Body() createAttackDto: CreateAttackDto) {
        return this.attacksService.create(createAttackDto);
    }

    @Get()
    findAll() {
        return this.attacksService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.attacksService.findOne(Number(id));
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateAttackDto: UpdateAttackDto) {
        return this.attacksService.update(Number(id), updateAttackDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.attacksService.remove(Number(id));
    }
}
