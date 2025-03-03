import { PokemonCard } from 'src/cards/entities/pokemon-card.entity';
import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';

@Entity()
export class TcgType {
    @PrimaryColumn({
        type: 'int',
        name: 'id',
    })
    id: number;

    @Column({
        type: 'varchar',
        length: 16,
        nullable: false,
        unique: true,
    })
    name: string;

    @Column({
        type: 'varchar',
        length: 16,
        nullable: true,
    })
    color: string;

    @OneToMany(() => PokemonCard, (pokemonCard) => pokemonCard.tcgType)
    pokemonCards: PokemonCard[];
}
