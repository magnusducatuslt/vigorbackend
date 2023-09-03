import { IndicatorDTO } from '../../indicator/dtos/indicatorDTO'
import { LabelDTO } from '../../label/dtos/labelDTO'

export interface RangeDTO {
    id: string,
    title: string
    min: number
    max: number
    description: string,
    indicatorId: string,
    indicator?: IndicatorDTO
    label?: LabelDTO[]
}