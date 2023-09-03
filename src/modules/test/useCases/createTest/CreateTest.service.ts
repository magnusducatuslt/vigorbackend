
import { CreateTestUserUseCase } from "./CreateTest.useCase";
import { CreateTestDTO, CreateTestDTOResponse } from "./CreateTest.dto";
import { BaseController } from "../../../../shared/infra/http/models/BaseController";

export class CreateTestService extends BaseController {
    constructor(private readonly useCase: CreateTestUserUseCase) {
        super();
        this.useCase = useCase;
    }

    async executeImpl(req: Request): Promise<any> {
        const dto: CreateTestDTO = Object.assign(req.body) as never as CreateTestDTO;

        try {
            const result = await this.useCase.execute(dto);

            if (result.isLeft()) {
                const error = result.value;

                switch (error.constructor) {
                    // case LoginUseCaseErrors.UserNameDoesntExistError:
                    //     return this.notFound(res, error.getErrorValue().message)
                    // case LoginUseCaseErrors.PasswordDoesntMatchError:
                    //     return this.clientError(res, error.getErrorValue().message)
                    default:
                        throw new Error(error.getErrorValue().message)
                }
            } else {
                const dto: CreateTestDTOResponse = result.value.getValue();
                return this.ok<CreateTestDTOResponse>(dto);
            }

        } catch (err) {
            throw new Error(err.message)
        }
    }
}