import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
    DataSource,
    DeleteResult,
    QueryRunner,
    Repository,
    UpdateResult,
} from 'typeorm';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { Pokemon } from './entities/pokemon.entity';

@Injectable()
export class PokemonsService {
    constructor(
        @InjectRepository(Pokemon)
        private readonly pokemonRepo: Repository<Pokemon>,
        private readonly dataSource: DataSource,
    ) {}

    async create(createPokemonDto: CreatePokemonDto, qr: QueryRunner) {
        const { lang, description, name, ...pokemonEntityLike } =
            createPokemonDto;
        const descriptions = [{ content: description, lang }];
        const names = [{ name, lang }];
        const pokemon = await this.pokemonRepo.save({
            id: 4,
            ...pokemonEntityLike,
            descriptions,
            pokemonNames: names,
            // descriptions: [{ content: description, lang }],
            // pokemonNames: [{ name, lang }],
        });
        return pokemon;
    }
    async create2(createPokemonDto: CreatePokemonDto, qr: QueryRunner) {
        // const { description: descriptionDto, ...pokemonDto } = createPokemonDto;
        // const entity = { ...pokemonDto, descriptions: [descriptionDto] };
        // const pokemon = await qr.manager.save(Pokemon, entity);
        // return pokemon;
    }

    async findAll() {
        const pokemon = await this.pokemonRepo.find({
            comment: 'This is a comment',
            relationLoadStrategy: 'query',
            order: {
                dexNo: { direction: 'ASC', nulls: 'LAST' },
            },
        });

        return pokemon;
    }

    async findOne(key: string | number): Promise<Pokemon> {
        const keyColumn = typeof key === 'string' ? 'identifier' : 'dex_no';

        const pokemon = await this.dataSource
            .getRepository(Pokemon)
            .createQueryBuilder('p')
            // .leftJoin('p.descriptions', 'd')
            // .addSelect('d.content')
            .leftJoinAndSelect('p.descriptions', 'd')
            .andWhere(`p.${keyColumn} = :key`, { key })
            .addOrderBy('dex_no', 'ASC', 'NULLS LAST')
            .getOne();

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

    async remove(key: string | number) {
        const result: DeleteResult = await this.pokemonRepo.delete(
            typeof key === 'string' ? { identifier: key } : { dexNo: key },
        );

        if (result.affected === 0) {
            throw new NotFoundException(`Pokemon not found for key: ${key}`);
        }

        return result;
    }
}
