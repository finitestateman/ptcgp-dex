import { CreateDateColumn, UpdateDateColumn, VersionColumn } from 'typeorm';

export abstract class Metadata {
    @CreateDateColumn({ type: 'timestamptz', select: false })
    public createdAt: Date;

    @UpdateDateColumn({ type: 'timestamptz', select: false })
    public updatedAt: Date;

    @VersionColumn({ select: false })
    public version: number;
}
