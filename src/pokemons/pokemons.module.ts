import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pokemon } from './entities/pokemon.entity';
import { PokemonsController } from './pokemons.controller';
import { PokemonsService } from './pokemons.service';

@Module({
    imports: [TypeOrmModule.forFeature([Pokemon])],
    controllers: [PokemonsController],
    providers: [PokemonsService],
})
export class PokemonsModule {}
