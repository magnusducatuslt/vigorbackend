
import { Result } from "../../../shared/core/Result";
import { ValueObject } from "../../../shared/domain/ValueObject";
import { Guard } from "../../../shared/core/Guard";

interface TitleProps {
    name: string;
}

export class Title extends ValueObject<TitleProps> {
    public static maxLength: number = 1000;
    public static minLength: number = 2;

    get value(): string {
        return this.props.name;
    }

    private constructor(props: TitleProps) {
        super(props);
    }

    public static create(props: TitleProps): Result<Title> {
        const usernameResult = Guard.againstNullOrUndefined(props.name, 'username');
        if (usernameResult.isFailure) {
            return Result.fail<Title>(usernameResult.getErrorValue())
        }

        const minLengthResult = Guard.againstAtLeast(this.minLength, props.name);
        if (minLengthResult.isFailure) {
            return Result.fail<Title>(minLengthResult.getErrorValue())
        }

        const maxLengthResult = Guard.againstAtMost(this.maxLength, props.name);
        if (maxLengthResult.isFailure) {
            return Result.fail<Title>(minLengthResult.getErrorValue())
        }

        return Result.ok<Title>(new Title(props));
    }
}