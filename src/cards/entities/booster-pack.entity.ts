import { Metadata } from 'src/common/metadata.table';
import { Entity, ManyToOne, OneToMany, PrimaryColumn } from 'typeorm';
import { CardsJoinBoosterPacks } from './cards-join-booster-packs.entity';
import { Expansion } from './expansion.entity';

@Entity()
export class BoosterPack extends Metadata {
    @PrimaryColumn({
        type: 'int',
        name: 'id',
    })
    id: number;

    @ManyToOne(() => Expansion, (expansion) => expansion.id)
    expansion: Expansion;

    @OneToMany(
        () => CardsJoinBoosterPacks,
        (cardsJoinBoosterPacks) => cardsJoinBoosterPacks.boosterPack,
    )
    cardsJoinBoosterPacks: CardsJoinBoosterPacks[];
}
