
import { Result } from "../../../shared/core/Result";
import { ValueObject } from "../../../shared/domain/ValueObject";
import { Guard } from "../../../shared/core/Guard";

interface MinProps {
    min: number;
}

export class Min extends ValueObject<MinProps> {
    public static maxLength: number = 1000;
    public static minLength: number = 2;

    get value(): number {
        return this.props.min;
    }

    private constructor(props: MinProps) {
        super(props);
    }

    public static create(props: MinProps): Result<Min> {
        const valueResult = Guard.againstNullOrUndefined(props.min, 'range.min');
        if (valueResult.isFailure) {
            return Result.fail<Min>(valueResult.getErrorValue())
        }

        const notNanResult = Guard.notNan(props.min, 'range.min');
        if (notNanResult.isFailure) {
            return Result.fail<Min>(notNanResult.getErrorValue())
        }

        const isNumberResult = Guard.isNumber(props.min, 'range.min');
        if (isNumberResult.isFailure) {
            return Result.fail<Min>(isNumberResult.getErrorValue())
        }

        return Result.ok<Min>(new Min(props));
    }
}