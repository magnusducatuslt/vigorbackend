
import { CreateRangeUseCase } from "./CreateRange.useCase";
import { CreateRangeDTO, CreateRangeDTOResponse } from "./CreateRange.dto";
import { BaseController } from "../../../../shared/infra/http/models/BaseController";

export class CreateRangeService extends BaseController {
    constructor(private readonly useCase: CreateRangeUseCase) {
        super();
        this.useCase = useCase;
    }

    async executeImpl(req: Request): Promise<any> {
        const dto: CreateRangeDTO = Object.assign(req.body) as never as CreateRangeDTO;

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
                const dto: CreateRangeDTOResponse = result.value.getValue();
                return this.ok<CreateRangeDTOResponse>(dto);
            }

        } catch (err) {
            throw new Error(err.message)
        }
    }
}