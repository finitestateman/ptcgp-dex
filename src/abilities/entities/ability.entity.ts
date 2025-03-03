import { Metadata } from 'src/common/metadata.table';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Ability extends Metadata {
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
    name: string;

    @Column({
        type: 'varchar',
        length: 512,
        nullable: true,
    })
    description: string;
}
