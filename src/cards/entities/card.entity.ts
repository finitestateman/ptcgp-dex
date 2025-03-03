import { RARITY, Rarity } from 'src/common/const/rarity';
import { Metadata } from 'src/common/metadata.table';
import {
    Column,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { CardsJoinBoosterPacks } from './cards-join-booster-packs.entity';
import { Illustrator } from './illustrator.entity';

@Entity()
export class Card extends Metadata {
    @PrimaryGeneratedColumn('identity', {
        type: 'int',
        name: 'id',
    })
    id: number;

    @Column({
        type: 'varchar',
        length: 64,
        nullable: false,
        unique: true,
    })
    identifier: string;

    @Column({
        type: 'varchar',
        length: 64,
        nullable: false,
        unique: true,
    })
    name: string;

    @Column({
        type: 'enum',
        enumName: 'rairty',
        enum: Object.values(RARITY),
        nullable: false,
    })
    rarity: Rarity;

    @Column({
        type: 'int',
        nullable: false,
    })
    point: number;

    @Column({
        type: 'numeric',
        precision: 6,
        scale: 2,
        nullable: false,
    })
    offeringRate: number;

    @ManyToOne(() => Illustrator, (illustrator) => illustrator.id, {
        nullable: false,
    })
    illustrator: Illustrator;

    @OneToMany(
        () => CardsJoinBoosterPacks,
        (cardsJoinBoosterPack) => cardsJoinBoosterPack.cardId,
    )
    cardsJointBoosterPacks: CardsJoinBoosterPacks[];
}
