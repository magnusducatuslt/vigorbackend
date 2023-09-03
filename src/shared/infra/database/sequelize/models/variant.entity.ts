import { Column, Model, Table, PrimaryKey, IsUUID, Default, DataType, BelongsToMany, BelongsTo, ForeignKey } from 'sequelize-typescript';
import { Question } from './question.entity';

@Table
export class Variant extends Model {
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

    @Column
    value: number

    @ForeignKey(() => Question)
    @Column(DataType.UUID)
    questionId: string;

    @BelongsTo(() => Question)
    question: Question
}