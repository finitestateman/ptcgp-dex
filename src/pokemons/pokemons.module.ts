import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Description } from './entities/description.entity';
import { Pokemon } from './entities/pokemon.entity';
import { PokemonsController } from './pokemons.controller';
import { PokemonsService } from './pokemons.service';

@Module({
    imports: [TypeOrmModule.forFeature([Pokemon, Description])],
    controllers: [PokemonsController],
    providers: [PokemonsService],
})
export class PokemonsModule {}
