import { RPG_TYPE, RpgType } from 'src/common/const/types';
import { Metadata } from 'src/common/metadata.table';
import { Description } from 'src/pokemons/entities/description.entity';
import {
    AfterLoad,
    Column,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
    Unique,
} from 'typeorm';
import { PokemonName } from './pokemon_name.entity';

@Entity({
    comment: 'Pokédex from the original Pokémon games',
})
@Unique(['dexNo', 'name'])
export class Pokemon extends Metadata {
    @PrimaryGeneratedColumn('identity', {
        type: 'int',
        name: 'id',
    })
    id: number;

    @Column({
        type: 'smallint',
        nullable: true,
        comment:
            'National Pokédex number.' +
            'Can be duplicated for different forms.(-> Not Unique)' +
            'Always null for Fossil Pokémons.(-> Nullable)' +
            'Must not be null for all other Pokémons.',
    })
    dexNo: number;

    @Column({
        type: 'varchar',
        length: 64,
        nullable: false,
        unique: true,
        comment:
            'kebab-case identifier of the Pokémon.' +
            'Used for multilanguage and URL path variable',
    })
    identifier: string;

    @Column({
        type: 'varchar',
        length: 64,
        nullable: false,
        comment: 'The Name of the Pokémon in English.',
    })
    name: string;

    @Column({
        type: 'varchar',
        length: 64,
        nullable: false,
        comment: 'e.g. Seed(without Pokémon)',
    })
    species: string;

    @Column({
        type: 'varchar',
        length: 64,
        nullable: false,
        enum: Object.values(RPG_TYPE),
    })
    type1: RpgType;

    @Column({
        type: 'varchar',
        length: 64,
        nullable: true,
        enum: Object.values(RPG_TYPE),
    })
    type2?: RpgType;

    @AfterLoad()
    setTypes() {
        this.types = this.type2 ? [this.type1, this.type2] : [this.type1];
    }
    types: [RpgType, RpgType?];

    @Column({
        type: 'integer',
        nullable: true,
        comment: "The Pokémon's height(cm) * 10.",
    })
    height?: number;

    @Column({
        type: 'integer',
        nullable: true,
        comment: "The Pokémon's weight(kg) * 10.",
    })
    weight?: number;

    @Column({
        type: 'smallint',
        nullable: true,
        comment: 'The generation in which the Pokémon was first introduced.',
    })
    introducedGen?: number;

    @OneToMany(() => Description, (description) => description.pokemon, {
        cascade: true,
        nullable: true,
        eager: true,
    })
    descriptions: Description[];

    @OneToMany(() => PokemonName, (pokemonName) => pokemonName.name, {
        cascade: true,
        nullable: true,
        eager: true,
    })
    pokemonNames: PokemonName[];
}
