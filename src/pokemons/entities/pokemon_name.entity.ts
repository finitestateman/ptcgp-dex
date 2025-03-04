import { LANG, lang } from 'src/common/const/lang';
import { Column, Entity, ManyToOne, PrimaryColumn, Unique } from 'typeorm';
import { Pokemon } from './pokemon.entity';

@Entity({
    synchronize: false,
})
@Unique(['lang', 'pokemon'])
export class PokemonName {
    @PrimaryColumn()
    pokemonId: number;

    @ManyToOne(() => Pokemon, (pokemon) => pokemon.id, {
        nullable: false,
        onDelete: 'CASCADE',
    })
    pokemon: Pokemon;

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
}
