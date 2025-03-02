import { CreateDateColumn, UpdateDateColumn, VersionColumn } from 'typeorm';

export abstract class MetaData {
    @CreateDateColumn({ select: false })
    public createdAt: Date;

    @UpdateDateColumn({ select: false })
    public updatedAt: Date;

    @VersionColumn({ select: false })
    public version: number;
}
