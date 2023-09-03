import { RangeDTO } from '../../range/dtos/rangeDTO'

export interface LabelDTO {
    id: string,
    title: string
    ranges?: RangeDTO[]
}