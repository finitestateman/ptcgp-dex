import { LANG, lang } from 'src/common/const/lang';
import {
    Column,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
    Unique,
} from 'typeorm';
import { Pokemon } from './pokemon.entity';

@Entity({
    // synchronize: false,
})
@Unique(['lang', 'pokemon'])
export class PokemonName {
    @PrimaryGeneratedColumn('identity', {
        type: 'int',
        name: 'id',
    })
    id: number;

    @Column({
        type: 'enum',
        nullable: false,
        enumName: 'lang',
        enum: Object.values(LANG),
    })
    lang: lang;

    @Column({
        type: 'varchar',
        length: 64,
        nullable: false,
    })
    name: string;

    @ManyToOne(() => Pokemon, (pokemon) => pokemon.pokemonNames, {
        nullable: false,
        onDelete: 'CASCADE',
    })
    pokemon: Pokemon;
}
