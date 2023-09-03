import { IndicatorDTO } from 'src/modules/indicator/dtos/indicatorDTO'
import { VariantDTO } from 'src/modules/variant/dtos/variantDTO'

export interface QuestionDTO {
    id: string,
    title: string
    indicator?: IndicatorDTO
    variants?: VariantDTO[]
}