import { Column, Model, Table, PrimaryKey, IsUUID, Default, DataType, BelongsToMany, BelongsTo, ForeignKey } from 'sequelize-typescript';
import { Indicator } from './indicator.entity';

import { RangeLabel } from './rangeLabel.entity'
import { Label } from "./label.entity"

@Table
export class Range extends Model {
    @PrimaryKey
    @IsUUID(4)
    @Default(DataType.UUIDV4)
    @Column({
        type: DataType.UUID,
        allowNull: false,
    })
    id: string;

    @Column
    title: string;

    @Column
    min: number;

    @Column
    max: number;

    @Column(DataType.TEXT)
    description: string;

    @ForeignKey(() => Indicator)
    @Column(DataType.UUID)
    indicatorId: string;

    @BelongsTo(() => Indicator)
    indicator: Indicator;

    @BelongsToMany(() => Label, () => RangeLabel)
    label: Label[];

}