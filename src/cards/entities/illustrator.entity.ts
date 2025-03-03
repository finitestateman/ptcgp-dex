import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Card } from './card.entity';

@Entity()
export class Illustrator {
    @PrimaryGeneratedColumn('identity', {
        type: 'int',
        name: 'id',
    })
    id: number;

    @Column({
        type: 'varchar',
        length: 64,
        unique: true,
        nullable: true,
    })
    name: string;

    @OneToMany(() => Card, (card) => card.illustrator)
    card: Card;
}
