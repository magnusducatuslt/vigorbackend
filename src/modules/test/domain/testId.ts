
import { UniqueEntityID } from "../../../shared/domain/UniqueEntityID";
import { Result } from "../../../shared/core/Result";
import { ValueObject } from "../../../shared/domain/ValueObject";
import { Guard } from "../../../shared/core/Guard";

export class TestId extends ValueObject<{ value: UniqueEntityID }> {

    getStringValue(): string {
        return this.props.value.toString();
    }

    getValue(): UniqueEntityID {
        return this.props.value;
    }

    private constructor(value: UniqueEntityID) {
        super({ value });
    }

    public static create(value: UniqueEntityID): Result<TestId> {
        let guardResult = Guard.againstNullOrUndefined(value, 'value');
        if (guardResult.isFailure) {
            return Result.fail<TestId>(guardResult.getErrorValue())
        }
        return Result.ok<TestId>(new TestId(value));
    }
}