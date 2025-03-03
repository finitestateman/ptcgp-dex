import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
} from '@nestjs/common';
import { AbilitiesService } from './abilities.service';
import { CreateAbilityDto } from './dto/create-ability.dto';
import { UpdateAbilityDto } from './dto/update-ability.dto';

@Controller('abilities')
export class AbilitiesController {
    constructor(private readonly abilitiesService: AbilitiesService) {}

    @Post()
    create(@Body() createAbilityDto: CreateAbilityDto) {
        return this.abilitiesService.create(createAbilityDto);
    }

    @Get()
    findAll() {
        return this.abilitiesService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.abilitiesService.findOne(Number(id));
    }

    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() updateAbilityDto: UpdateAbilityDto,
    ) {
        return this.abilitiesService.update(Number(id), updateAbilityDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.abilitiesService.remove(Number(id));
    }
}
