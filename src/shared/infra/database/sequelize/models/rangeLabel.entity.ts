import { Column, Model, Table, PrimaryKey, IsUUID, Default, DataType, HasMany, BelongsTo, ForeignKey } from 'sequelize-typescript';
import { v4 as uuidv4 } from 'uuid';

import { Label } from './label.entity'
import { Range } from './range.entity'

@Table
export class RangeLabel extends Model {
    @PrimaryKey
    @IsUUID(4)
    @Default(DataType.UUIDV4)
    @Column({
        type: DataType.UUID,
        allowNull: false,
    })
    id: string

    @ForeignKey(() => Range)
    @Column(DataType.UUID)
    rangeId: string;

    @ForeignKey(() => Label)
    @Column(DataType.UUID)
    labelId: string;

}