import { Column, Model, Table, PrimaryKey, IsUUID, Default, DataType, BelongsToMany, BelongsTo, ForeignKey, HasMany } from 'sequelize-typescript';
import { Variant } from './variant.entity';
import { QuestionIndicator } from './questionIndicator.entity'
import { Indicator } from './indicator.entity';

import { Range } from './range.entity'
import { RangeLabel } from './rangeLabel.entity'

@Table
export class Question extends Model {
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

    @BelongsToMany(() => Indicator, () => QuestionIndicator)
    indicators: Indicator[];

    @HasMany(() => Variant)
    variants: Variant[]
}