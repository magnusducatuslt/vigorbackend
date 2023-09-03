
import { Result } from "../../../shared/core/Result";
import { ValueObject } from "../../../shared/domain/ValueObject";
import { Guard } from "../../../shared/core/Guard";

interface ValueProps {
    value: number;
}

export class Value extends ValueObject<ValueProps> {
    public static maxLength: number = 1000;
    public static minLength: number = 2;

    get value(): number {
        return this.props.value;
    }

    private constructor(props: ValueProps) {
        super(props);
    }

    public static create(props: ValueProps): Result<Value> {
        const valueResult = Guard.againstNullOrUndefined(props.value, 'variant.value');
        if (valueResult.isFailure) {
            return Result.fail<Value>(valueResult.getErrorValue())
        }

        const notNanResult = Guard.notNan(props.value, 'variant.value');
        if (notNanResult.isFailure) {
            return Result.fail<Value>(notNanResult.getErrorValue())
        }

        const isNumberResult = Guard.isNumber(props.value, 'variant.value');
        if (isNumberResult.isFailure) {
            return Result.fail<Value>(isNumberResult.getErrorValue())
        }

        return Result.ok<Value>(new Value(props));
    }
}