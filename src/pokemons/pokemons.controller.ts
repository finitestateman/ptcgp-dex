import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
} from '@nestjs/common';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { PokemonKeyPipe } from './pipes/pokemon-key.pipe';
import { PokemonsService } from './pokemons.service';

@Controller('pokemons')
export class PokemonsController {
    constructor(private readonly pokemonsService: PokemonsService) {}

    @Post()
    create(@Body() createPokemonDto: CreatePokemonDto) {
        return this.pokemonsService.create(createPokemonDto);
    }

    @Get()
    findAll() {
        return this.pokemonsService.findAll();
    }

    @Get([':key'])
    findOne(@Param('key', PokemonKeyPipe) key: string | number) {
        return this.pokemonsService.findOne(key);
    }

    @Patch(':key')
    update(
        @Param('key', PokemonKeyPipe) key: string | number,
        @Body() updatePokemonDto: UpdatePokemonDto,
    ) {
        return this.pokemonsService.update(key, updatePokemonDto);
    }

    @Delete(':key')
    remove(@Param('key', PokemonKeyPipe) key: string | number) {
        return this.pokemonsService.remove(key);
    }
}
