import { Ability } from 'src/abilities/entities/ability.entity';
import { Attack } from 'src/attacks/entities/attack.entity';
import { ENERGY, Energy } from 'src/common/const/types';
import { Pokemon } from 'src/pokemons/entities/pokemon.entity';
import { TcgType } from 'src/tcg-types/entities/tcg-type.entity';
import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToOne,
    PrimaryColumn,
} from 'typeorm';
import { Card } from './card.entity';
import { Description } from './description.entity';

@Entity()
export class PokemonCard {
    @PrimaryColumn()
    cardId: number;

    @OneToOne(() => Card, (card) => card.id)
    @JoinColumn()
    card: Card;

    @Column()
    stage: number;

    @Column()
    hp: number;

    @ManyToOne(() => TcgType, (tcgType) => tcgType.id)
    tcgType: TcgType;

    @ManyToOne(() => Attack, (attack) => attack.id)
    attack1: Attack;

    @ManyToOne(() => Attack, (attack) => attack.id)
    attack2: Attack;

    @Column({
        type: 'varchar',
        enumName: 'energy',
        enum: Object.values(ENERGY),
        array: true,
        nullable: false,
    })
    retreat: Energy[];

    @ManyToOne(() => TcgType, (tcgType) => tcgType.id)
    weakness: TcgType;

    @Column({
        type: 'varchar',
        length: 512,
        nullable: true,
    })
    exRule: string;

    @ManyToOne(() => Pokemon, (pokemon) => pokemon.id)
    evolvesFrom: number;

    @ManyToOne(() => Ability, (ability) => ability.id)
    ability: Ability;

    @ManyToOne(() => Pokemon, (pokemon) => pokemon.id)
    pokemon: Pokemon;

    @ManyToOne(() => Description, (description) => description.id)
    description: Description;
}
