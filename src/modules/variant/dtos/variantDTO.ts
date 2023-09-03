import { QuestionDTO } from '../../question/dtos/questionDTO'

export interface VariantDTO {
    id: string,
    title: string
    value: number
    questionId: string,
    question?: QuestionDTO
}