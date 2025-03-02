import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { Pokemon } from './entities/pokemon.entity';

@Injectable()
export class PokemonsService {
    constructor(
        @InjectRepository(Pokemon)
        private readonly pokemonRepo: Repository<Pokemon>,
    ) {}

    async create(createPokemonDto: CreatePokemonDto) {
        const entity = this.pokemonRepo.create(createPokemonDto);
        const { identifier, dexNo } = await this.pokemonRepo.save(entity);
        return { identifier, dexNo };
    }

    findAll() {
        return this.pokemonRepo.find();
    }

    async findOne(key: string | number): Promise<Pokemon> {
        const pokemon = await this.pokemonRepo.findOne({
            where: [
                typeof key === 'string' ? { identifier: key } : { dexNo: key },
            ],
        });

        if (!pokemon) {
            throw new NotFoundException(`Pokemon not found for key: ${key}`);
        }

        return pokemon;
    }

    async update(key: string | number, updatePokemonDto: UpdatePokemonDto) {
        const result: UpdateResult = await this.pokemonRepo.update(
            typeof key === 'string' ? { identifier: key } : { dexNo: key },
            updatePokemonDto,
        );

        if (result.affected === 0) {
            throw new NotFoundException(`Pokemon not found for key: ${key}`);
        }

        return result;
    }

    async remove(id: string | number) {
        const result: DeleteResult = await this.pokemonRepo.delete(
            typeof id === 'string' ? { identifier: id } : { dexNo: id },
        );

        if (result.affected === 0) {
            throw new NotFoundException(`Pokemon not found for key: ${id}`);
        }

        return result;
    }
}
