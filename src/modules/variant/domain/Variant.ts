import { Title } from './title'
import { Value } from './value'
import { Question } from '../../question/domain/Question'
import { VariantId } from "./variantId";


import { UniqueEntityID } from "../../../shared/domain/UniqueEntityID";
import { Result } from "../../../shared/core/Result";
import { Guard } from "../../../shared/core/Guard";
import { AggregateRoot } from "../../../shared/domain/AggregateRoot";

interface VariantProps {
    title: Title,
    value: Value,
    questionId: string,
    question?: Question
}

export class Variant extends AggregateRoot<VariantProps> {

    get variantId(): VariantId {
        return VariantId.create(this._id)
            .getValue();
    }

    get value(): Value {
        return this.props.value
    }

    get questionId(): string {
        return this.props.questionId
    }

    get title(): Title {
        return this.props.title;
    }

    get question(): Question {
        return this.props.question
    }

    private constructor(props: VariantProps, id?: UniqueEntityID) {
        super(props, id)
    }

    public static create(props: VariantProps, id?: UniqueEntityID): Result<Variant> {
        const guardResult = Guard.againstNullOrUndefinedBulk([
            { argument: props.title, argumentName: 'title' },
        ]);

        if (guardResult.isFailure) {
            return Result.fail<Variant>(guardResult.getErrorValue())
        }

        const isNewTitle = !!id === false;
        const test = new Variant({
            ...props,
        }, id);

        // if (isNewUser) {
        //     user.addDomainEvent(new UserCreated(user));
        // }

        return Result.ok<Variant>(test);
    }
}