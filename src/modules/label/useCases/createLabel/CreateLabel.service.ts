
import { CreateLabelUseCase } from "./CreateLabel.useCase";
import { CreateLabelDTO, CreateLabelDTOResponse } from "./CreateLabel.dto";
import { BaseController } from "../../../../shared/infra/http/models/BaseController";

export class CreateRangeService extends BaseController {
    constructor(private readonly useCase: CreateLabelUseCase) {
        super();
        this.useCase = useCase;
    }

    async executeImpl(req: Request): Promise<any> {
        const dto: CreateLabelDTO = Object.assign(req.body) as never as CreateLabelDTO;

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
                const dto: CreateLabelDTOResponse = result.value.getValue();
                return this.ok<CreateLabelDTOResponse>(dto);
            }

        } catch (err) {
            throw new Error(err.message)
        }
    }
}