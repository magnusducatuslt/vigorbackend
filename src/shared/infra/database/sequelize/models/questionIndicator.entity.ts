import { Column, Model, Table, PrimaryKey, IsUUID, Default, DataType, BelongsToMany, BelongsTo, ForeignKey, HasMany } from 'sequelize-typescript';

import { Indicator } from './indicator.entity';
import { Question } from './question.entity'

@Table
export class QuestionIndicator extends Model {
    @PrimaryKey
    @IsUUID(4)
    @Default(DataType.UUIDV4)
    @Column({
        type: DataType.UUID,
        allowNull: false,
    })
    id: string

    @ForeignKey(() => Indicator)
    @Column(DataType.UUID)
    indicatorId: string;

    @ForeignKey(() => Question)
    @Column(DataType.UUID)
    questionId: string;
}