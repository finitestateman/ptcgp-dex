import { Exclude } from 'class-transformer';
import { CreateDateColumn, UpdateDateColumn, VersionColumn } from 'typeorm';

@Exclude()
export abstract class Metadata {
    @CreateDateColumn({ type: 'timestamptz', select: false })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamptz', select: false })
    updatedAt: Date;

    @VersionColumn({ select: false })
    version: number;
}
