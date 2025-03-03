import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    Request,
    UseInterceptors,
} from '@nestjs/common';
import { TransactionInterceptor } from 'src/common/Interceptors/transaction.interceptor';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { PokemonKeyPipe } from './pipes/pokemon-key.pipe';
import { PokemonsService } from './pokemons.service';

@Controller('pokemons')
export class PokemonsController {
    constructor(private readonly pokemonsService: PokemonsService) {}

    @Post()
    @UseInterceptors(TransactionInterceptor)
    create(
        @Body() createPokemonDto: CreatePokemonDto,
        @Request() { queryRunner: qr },
    ) {
        return this.pokemonsService.create(createPokemonDto, qr);
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
