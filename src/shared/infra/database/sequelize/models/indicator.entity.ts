import { Column, Model, Table, PrimaryKey, IsUUID, Default, DataType, HasMany, BelongsTo, ForeignKey, BelongsToMany } from 'sequelize-typescript';
import { v4 as uuidv4 } from 'uuid';

import { Test } from './test.entity'
import { Range } from './range.entity'
import { Question } from './question.entity';
import { QuestionIndicator } from './questionIndicator.entity';

@Table
export class Indicator extends Model {
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

    @ForeignKey(() => Test)
    @Column(DataType.UUID)
    testId: string

    @BelongsTo(() => Test)
    test: Test

    @HasMany(() => Range)
    ranges: Range[]

    @BelongsToMany(() => Question, () => QuestionIndicator)
    questions: Question[]

}