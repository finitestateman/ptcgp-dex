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
import { Description } from './entities/description.entity';
import { Pokemon } from './entities/pokemon.entity';

@Injectable()
export class PokemonsService {
    constructor(
        @InjectRepository(Pokemon)
        private readonly pokemonRepo: Repository<Pokemon>,
        private readonly dataSource: DataSource,
    ) {}

    async create(createPokemonDto: CreatePokemonDto, qr: QueryRunner) {
        const { description: descriptionDto, ...pokemonDto } = createPokemonDto;

        const pokemon = await qr.manager.save(Pokemon, pokemonDto);
        const description = await qr.manager.save(Description, {
            ...descriptionDto,
            pokemon: { id: pokemon.id },
        });
        return { ...pokemon, description };

        // const pokemon = await this.pokemonRepo.save(createPokemonDto);

        // if (createPokemonDto.content) {
        //     const description = this.pokemonRepo.create({
        //         ...pokemon,
        //         descriptions: {
        //             content: createPokemonDto.content,
        //         },
        //     });
        // await this.pokemonRepo.save(description);
        // }

        // const pokemon = await this.pokemonRepo.save(pokemonDto);

        // const pokemon = await this.pokemonRepo.save({
        //     pokemonDto,
        //     criptions: [],
        //     //     descriptionDto,
        //     //     // {
        //     //     //     // id: 1,
        //     //     //     content: createPokemonDto.content,
        //     //     //     pokemon: {
        //     //     //         id: 1,
        //     //     //     },
        //     //     // },
        //     // ],
        // });

        // const description = this.descriptionRepo.save({
        //     ...descriptionDto,
        //     pokemon: { id: pokemon.id },
        // });
        // return pokemon;
    }

    async findAll() {
        const qb = this.dataSource
            .getRepository(Pokemon)
            .createQueryBuilder('p')
            .leftJoin('p.descriptions', 'd')
            .addSelect('d.content')
            .addOrderBy('dex_no', 'ASC', 'NULLS LAST');

        const pokemon = await qb.getMany();
        return pokemon;
    }

    async findOne(key: string | number): Promise<Pokemon> {
        const keyColumn = typeof key === 'string' ? 'identifier' : 'dex_no';

        try {
            const pokemon = await this.dataSource
                .getRepository(Pokemon)
                .createQueryBuilder('p')
                .leftJoin('p.descriptions', 'd')
                .addSelect('d.content')
                .andWhere(`p.${keyColumn} = :key`, { key })
                .addOrderBy('dex_no', 'ASC', 'NULLS LAST')
                .getOne();

            if (!pokemon) {
                throw new NotFoundException(
                    `Pokemon not found for key: ${key}`,
                );
            }

            return pokemon;
        } catch (error) {
            console.log(error);
            throw error;
            // throw new BadRequestException(error);
        }

        // const pokemon = await this.pokemonRepo.findOne({
        //     where: [
        //         typeof key === 'string' ? { identifier: key } : { dexNo: key },
        //     ],
        // });
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
