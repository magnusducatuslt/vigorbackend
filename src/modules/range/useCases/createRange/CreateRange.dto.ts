
export interface CreateRangeDTO {
    title: string;
    min: number,
    max: number,
    description: string,
    indicatorId: string,
}

export interface CreateRangeDTOResponse {
    id: string
    title: string;
    min: number,
    max: number,
    description: string,
    indicatorId: string,
}