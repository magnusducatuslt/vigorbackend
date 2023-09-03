
import { CreateIndicatorUseCase } from "./CreateIndicator.useCase";
import { CreateIndicatorDTO, CreateIndicatorDTOResponse } from "./CreateIndicator.dto";
import { BaseController } from "../../../../shared/infra/http/models/BaseController";

export class CreateIndicatorService extends BaseController {
    constructor(private readonly useCase: CreateIndicatorUseCase) {
        super();
        this.useCase = useCase;
    }

    async executeImpl(req: Request): Promise<any> {
        const dto: CreateIndicatorDTO = Object.assign(req.body) as never as CreateIndicatorDTO;

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
                const dto: CreateIndicatorDTOResponse = result.value.getValue();
                return this.ok<CreateIndicatorDTOResponse>(dto);
            }

        } catch (err) {
            throw new Error(err.message)
        }
    }
}