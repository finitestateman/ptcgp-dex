import { Entity, ManyToOne, PrimaryColumn, Unique } from 'typeorm';
import { BoosterPack } from './booster-pack.entity';
import { Card } from './card.entity';

@Entity()
@Unique(['cardNo', 'boosterPack'])
export class CardsJoinBoosterPacks {
    @PrimaryColumn()
    cardId: number;

    @ManyToOne(() => Card, (card) => card.id)
    card: Card;

    @PrimaryColumn()
    cardNo: number;

    @ManyToOne(() => BoosterPack, (boosterPack) => boosterPack.id)
    boosterPack: number;
}
