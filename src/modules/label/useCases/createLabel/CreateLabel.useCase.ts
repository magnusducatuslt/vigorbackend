import { ConfigService } from '@nestjs/config'
import { BadRequestException } from '@nestjs/common'

import { CreateLabelDTO, CreateLabelDTOResponse } from "./CreateLabel.dto";
import { AppError } from "../../../../shared/core/AppError";
import { Either, Result, left, right } from "../../../../shared/core/Result";
import { UseCase } from "../../../../shared/core/UseCase";
import { IIndicatorRepo } from '../../../indicator/repos/indicatorRepo'
import { ILabelRepo } from "../../repos/labelRepo";
import { Label } from "../../domain/Label";
import { Title } from "../../domain/title";
import { LabelMap } from '../../mappers/labelMap'

type Response = Either<
    AppError.UnexpectedError,
    Result<CreateLabelDTOResponse>
>

export class CreateLabelUseCase implements UseCase<CreateLabelDTO, Promise<Response>> {

    constructor(private readonly labelRepo: ILabelRepo) {

    }

    public async execute(request: CreateLabelDTO): Promise<Response> {
        let label: Label;
        let title: Title;

        try {

            const titleOrError = Title.create({ name: request.title });

            if (titleOrError.isFailure) {
                new BadRequestException(titleOrError.getErrorValue())
            }


            title = titleOrError.getValue()

            const isLabelExist = await this.labelRepo.exists(title)
            if (isLabelExist) {
                throw new BadRequestException('label exist')
            }

            const labelOrError: Result<Label> = Label.create({
                title,
            });

            if (labelOrError.isFailure) {
                throw new BadRequestException(labelOrError.getErrorValue())
            }

            label = labelOrError.getValue();

            const labelCreated = await this.labelRepo.save(label);

            return right(Result.ok<CreateLabelDTOResponse>(LabelMap.toDTO(labelCreated)));
        } catch (err) {
            return left(new AppError.UnexpectedError(err.toString()))
        }
    }
}