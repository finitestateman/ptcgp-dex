import { Metadata } from 'src/common/metadata.table';
import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { BoosterPack } from './booster-pack.entity';

@Entity()
export class Expansion extends Metadata {
    @PrimaryColumn({
        type: 'int',
        name: 'id',
    })
    id: number;

    @Column({
        type: 'varchar',
        length: 64,
        unique: true,
        nullable: false,
    })
    title: string;

    @Column({
        type: 'varchar',
        length: 64,
        unique: true,
        nullable: false,
    })
    alias: string;

    @Column({
        type: 'varchar',
        length: 64,
        unique: true,
        nullable: false,
    })
    series: string;

    @Column({
        type: 'varchar',
        length: 64,
        unique: true,
        nullable: false,
    })
    code: string;

    @Column({
        type: 'timestamptz',
        nullable: false,
    })
    releasedAt: Date;

    @OneToMany(() => BoosterPack, (boosterPack) => boosterPack.id)
    boosterPacks: BoosterPack[];
}
