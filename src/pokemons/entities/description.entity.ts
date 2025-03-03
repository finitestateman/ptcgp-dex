import { lang, LANG } from 'src/common/const/lang';
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
    content: string;

    @Column({
        type: 'enum',
        nullable: false,
        enumName: 'lang',
        enum: Object.values(LANG),
    })
    lang: lang;

    @ManyToOne(() => Pokemon, (pokemon) => pokemon.descriptions)
    pokemon: Pokemon;
}
