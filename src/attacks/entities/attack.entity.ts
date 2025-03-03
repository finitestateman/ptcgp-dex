import { PokemonCard } from 'src/cards/entities/pokemon-card.entity';
import { ENERGY, Energy, OPERATOR, Operator } from 'src/common/const/types';
import { Metadata } from 'src/common/metadata.table';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Attack extends Metadata {
    @PrimaryGeneratedColumn('identity', {
        type: 'int',
        name: 'id',
    })
    id: number;

    @Column({
        type: 'varchar',
        length: 64,
        nullable: false,
        unique: true,
    })
    name: string;

    @Column({
        type: 'smallint',
        nullable: true,
    })
    damage: number;

    @Column({
        type: 'enum',
        enumName: 'energy',
        enum: Object.values(ENERGY),
        array: true,
        nullable: false,
    })
    energies: Energy[];

    @Column({
        type: 'varchar',
        length: 512,
        nullable: true,
    })
    description: string;

    @Column({
        type: 'enum',
        enumName: 'operator',
        enum: Object.values(OPERATOR),
        nullable: true,
    })
    operator: Operator;

    @ManyToOne(() => PokemonCard, (pokemonCard) => pokemonCard.cardId)
    pokemonCard: PokemonCard;
}
