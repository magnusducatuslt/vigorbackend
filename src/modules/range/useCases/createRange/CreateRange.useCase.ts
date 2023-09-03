import { ConfigService } from '@nestjs/config'
import { BadRequestException } from '@nestjs/common'

import { CreateRangeDTO, CreateRangeDTOResponse } from "./CreateRange.dto";
import { AppError } from "../../../../shared/core/AppError";
import { Either, Result, left, right } from "../../../../shared/core/Result";
import { UseCase } from "../../../../shared/core/UseCase";
import { IIndicatorRepo } from '../../../indicator/repos/indicatorRepo'
import { IRangeRepo } from "../../repos/rangeRepo";
import { Range } from "../../domain/Range";
import { Title } from "../../domain/title";
import { Max } from '../../domain/max'
import { Min } from '../../domain/min'
import { RangeMap } from '../../mappers/rangeMap'
import { Indicator } from '../../../indicator/domain/Indicator';

type Response = Either<
    AppError.UnexpectedError,
    Result<CreateRangeDTOResponse>
>

export class CreateRangeUseCase implements UseCase<CreateRangeDTO, Promise<Response>> {

    constructor(private readonly rangeRepo: IRangeRepo, private readonly indicatorRepo: IIndicatorRepo) {

    }

    public async execute(request: CreateRangeDTO): Promise<Response> {
        let range: Range;
        let title: Title;
        let max: Max;
        let min: Min;

        let indicator: Indicator

        try {

            const titleOrError = Title.create({ name: request.title });
            const maxOrError = Max.create({ max: request.max });
            const minOrError = Min.create({ min: request.min });

            if (titleOrError.isFailure) {
                new BadRequestException(titleOrError.getErrorValue())
            }

            if (maxOrError.isFailure) {
                new BadRequestException(maxOrError.getErrorValue())
            }

            if (minOrError.isFailure) {
                new BadRequestException(minOrError.getErrorValue())
            }

            title = titleOrError.getValue()
            min = minOrError.getValue()
            max = maxOrError.getValue()

            indicator = await this.indicatorRepo.getIndicatorById(request.indicatorId)
            if (!indicator) {
                throw new BadRequestException('indicator doesnt exist')
            }

            const rangeOrError: Result<Range> = Range.create({
                title,
                min,
                max,
                description: request.description,
                indicatorId: request.indicatorId
            });

            if (rangeOrError.isFailure) {
                throw new BadRequestException(rangeOrError.getErrorValue())
            }

            range = rangeOrError.getValue();

            const rangeCreated = await this.rangeRepo.save(range);

            return right(Result.ok<CreateRangeDTOResponse>(RangeMap.toDTO(rangeCreated)));
        } catch (err) {
            return left(new AppError.UnexpectedError(err.toString()))
        }
    }
}