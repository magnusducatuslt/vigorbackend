import { ConfigService } from '@nestjs/config'
import { BadRequestException } from '@nestjs/common'

import { CreateTestDTO, CreateTestDTOResponse } from "./CreateTest.dto";
import { AppError } from "../../../../shared/core/AppError";
import { Either, Result, left, right } from "../../../../shared/core/Result";
import { UseCase } from "../../../../shared/core/UseCase";
import { ITestRepo } from "../../repos/testRepo";
import { Test } from "../../domain/Test";
import { Title } from "../../domain/title";
import { TestMap } from '../../mappers/TestMap'

type Response = Either<
    AppError.UnexpectedError,
    Result<CreateTestDTOResponse>
>

export class CreateTestUserUseCase implements UseCase<CreateTestDTO, Promise<Response>> {

    constructor(private readonly testRepo: ITestRepo) {

    }

    public async execute(request: CreateTestDTO): Promise<Response> {
        let test: Test;
        let title: Title;

        try {

            const titleOrError = Title.create({ name: request.title });

            if (titleOrError.isFailure) {
                new BadRequestException(titleOrError.getErrorValue())
            }

            title = titleOrError.getValue()

            const isTestExist = await this.testRepo.exists(title)
            if (isTestExist) {
                throw new BadRequestException('test exist')
            }

            const testOrError: Result<Test> = Test.create({
                title
            });

            if (testOrError.isFailure) {
                throw new BadRequestException(testOrError.getErrorValue())
            }

            test = testOrError.getValue();

            const testCreated = await this.testRepo.save(test);
            return right(Result.ok<CreateTestDTOResponse>(TestMap.toDTO(testCreated)));
        } catch (err) {
            return left(new AppError.UnexpectedError(err.toString()))
        }
    }
}