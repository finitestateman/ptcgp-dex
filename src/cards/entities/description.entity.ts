import { Metadata } from 'src/common/metadata.table';
import { Pokemon } from 'src/pokemons/entities/pokemon.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Description extends Metadata {
    @PrimaryGeneratedColumn('identity', {
        type: 'int',
        name: 'id',
    })
    id: number;

    @Column({
        type: 'varchar',
        length: '512',
        nullable: false,
    })
    content: number;

    @ManyToOne(() => Pokemon, (pokemon) => pokemon.id)
    pokemon: Pokemon;
}
