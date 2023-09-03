import { Column, Model, Table, PrimaryKey, IsUUID, Default, DataType, HasMany, BelongsTo, ForeignKey } from 'sequelize-typescript';
import { v4 as uuidv4 } from 'uuid';

import { Indicator } from './indicator.entity'

@Table
export class Test extends Model {
    @PrimaryKey
    @IsUUID(4)
    @Default(DataType.UUIDV4)
    @Column({
        type: DataType.UUID,
        allowNull: false,
    })
    id: string

    @Column
    title: string

    @HasMany(() => Indicator)
    indicators: Indicator[]

}