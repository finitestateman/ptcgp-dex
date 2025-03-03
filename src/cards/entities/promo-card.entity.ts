import { Column, Entity, OneToOne, PrimaryColumn } from 'typeorm';
import { Card } from './card.entity';

@Entity()
export class PromoCard {
    @PrimaryColumn()
    cardId: number;

    @OneToOne(() => Card, (card) => card.id)
    card: Card;

    @Column({
        type: 'varchar',
        length: 128,
        nullable: true,
    })
    howToObtain: string;
}
