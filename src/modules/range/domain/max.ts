
import { Result } from "../../../shared/core/Result";
import { ValueObject } from "../../../shared/domain/ValueObject";
import { Guard } from "../../../shared/core/Guard";

interface MaxProps {
    max: number;
}

export class Max extends ValueObject<MaxProps> {
    public static maxLength: number = 1000;
    public static minLength: number = 2;

    get value(): number {
        return this.props.max;
    }

    private constructor(props: MaxProps) {
        super(props);
    }

    public static create(props: MaxProps): Result<Max> {
        const valueResult = Guard.againstNullOrUndefined(props.max, 'question.max');
        if (valueResult.isFailure) {
            return Result.fail<Max>(valueResult.getErrorValue())
        }

        const notNanResult = Guard.notNan(props.max, 'question.max');
        if (notNanResult.isFailure) {
            return Result.fail<Max>(notNanResult.getErrorValue())
        }

        const isNumberResult = Guard.isNumber(props.max, 'question.max');
        if (isNumberResult.isFailure) {
            return Result.fail<Max>(isNumberResult.getErrorValue())
        }

        return Result.ok<Max>(new Max(props));
    }
}