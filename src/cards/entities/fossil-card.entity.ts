import { Column, Entity, OneToOne, PrimaryColumn } from 'typeorm';
import { TrainerCard } from './trainer-card.entity';

@Entity()
export class FossilCard {
    @PrimaryColumn()
    trainerCardId: number;

    @OneToOne(() => TrainerCard, (trainerCard) => trainerCard.cardId)
    trainderCard: TrainerCard;

    @Column({
        type: 'smallint',
        nullable: false,
        default: 40,
    })
    hp: number;
}
