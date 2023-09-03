import { RangeDTO } from "../../../range/dtos/rangeDTO";

export interface CreateLabelDTO {
    title: string;
}

export interface CreateLabelDTOResponse {
    id: string
    title: string;
    ranges?: RangeDTO[]
}