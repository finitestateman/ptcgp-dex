import { TRAINER_KIND, TrainerKind } from 'src/common/const/trainer-kind';
import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';
import { Card } from './card.entity';

@Entity()
export class TrainerCard {
    // https://github.com/typeorm/typeorm/pull/8616
    @PrimaryColumn()
    cardId: number;

    @OneToOne(() => Card, (card) => card.id)
    @JoinColumn()
    card: Card;

    @Column({
        type: 'enum',
        enum: Object.values(TRAINER_KIND),
        nullable: false,
    })
    kind: TrainerKind;

    @Column({
        type: 'varchar',
        length: 512,
    })
    description: string;

    @Column()
    footNote: string;
}
