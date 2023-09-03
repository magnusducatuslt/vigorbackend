import { Column, Model, Table, PrimaryKey, IsUUID, Default, DataType, BelongsToMany, BelongsTo, ForeignKey } from 'sequelize-typescript';

import { Range } from './range.entity'
import { RangeLabel } from './rangeLabel.entity'

@Table
export class Label extends Model {
    @PrimaryKey
    @IsUUID(4)
    @Default(DataType.UUIDV4)
    @Column({
        type: DataType.UUID,
        allowNull: false,
    })
    id: string

    @Column(DataType.TEXT)
    title: string

    @BelongsToMany(() => Range, () => RangeLabel)
    ranges: Range[];
}