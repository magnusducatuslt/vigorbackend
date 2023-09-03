import { ConfigService } from '@nestjs/config'
import { BadRequestException } from '@nestjs/common'

import { CreateIndicatorDTO, CreateIndicatorDTOResponse } from "./CreateIndicator.dto";
import { AppError } from "../../../../shared/core/AppError";
import { Either, Result, left, right } from "../../../../shared/core/Result";
import { UseCase } from "../../../../shared/core/UseCase";
import { IIndicatorRepo } from "../../repos/indicatorRepo";
import { Indicator } from "../../domain/Indicator";
import { Title } from "../../domain/title";
import { IndicatorMap } from '../../mappers/indicatorMap'
import { ITestRepo } from '../../../test/repos/testRepo';
import { Test } from '../../../test/domain/Test';

type Response = Either<
    AppError.UnexpectedError,
    Result<CreateIndicatorDTOResponse>
>

export class CreateIndicatorUseCase implements UseCase<CreateIndicatorDTO, Promise<Response>> {

    constructor(private readonly indicatorRepo: IIndicatorRepo, private readonly testRepo: ITestRepo) {

    }

    public async execute(request: CreateIndicatorDTO): Promise<Response> {
        let indicator: Indicator;
        let test: Test
        let title: Title;

        try {

            test = await this.testRepo.getTestByTestId(request.testId);

            if (!test) {
                throw new BadRequestException('Test doesnt exist')
            }

            const titleOrError = Title.create({ name: request.title });

            if (titleOrError.isFailure) {
                new BadRequestException(titleOrError.getErrorValue())
            }

            title = titleOrError.getValue()

            const isTestExist = await this.testRepo.exists(title)
            if (isTestExist) {
                throw new BadRequestException('test exist')
            }

            const indicatorOrError: Result<Indicator> = Indicator.create({
                title,
                testId: request.testId
            });

            if (indicatorOrError.isFailure) {
                throw new BadRequestException(indicatorOrError.getErrorValue())
            }

            indicator = indicatorOrError.getValue();

            const indicatorCreated = await this.indicatorRepo.save(indicator);
            return right(Result.ok<CreateIndicatorDTOResponse>(IndicatorMap.toDTO(indicatorCreated)));
        } catch (err) {
            return left(new AppError.UnexpectedError(err.toString()))
        }
    }
}