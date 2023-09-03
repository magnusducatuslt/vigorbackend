import { testDTO } from '../../test/dtos/testDTO'
import { RangeDTO } from '../../range/dtos/rangeDTO'
import { QuestionDTO } from '../../question/dtos/questionDTO'

export interface IndicatorDTO {
    id: string,
    title: string
    testId: string
    test?: testDTO,
    ranges?: RangeDTO[]
    questions?: QuestionDTO[]
}