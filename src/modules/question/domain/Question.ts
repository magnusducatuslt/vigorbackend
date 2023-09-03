import { Title } from './title'
import { QuestionId } from "./questionId";


import { Indicator } from '../../indicator/domain/Indicator'
import { Variant } from '../../variant/domain/Variant'

import { UniqueEntityID } from "../../../shared/domain/UniqueEntityID";
import { Result } from "../../../shared/core/Result";
import { Guard } from "../../../shared/core/Guard";
import { AggregateRoot } from "../../../shared/domain/AggregateRoot";

interface QuestionProps {
    title: Title,
    indicator?: Indicator,
    variants?: Variant[],
}

export class Question extends AggregateRoot<QuestionProps> {

    get questionId(): QuestionId {
        return QuestionId.create(this._id)
            .getValue();
    }

    get variants(): Variant[] {
        return this.props.variants
    }

    get indicator(): Indicator {
        return this.props.indicator
    }

    get title(): Title {
        return this.props.title;
    }

    private constructor(props: QuestionProps, id?: UniqueEntityID) {
        super(props, id)
    }

    public static create(props: QuestionProps, id?: UniqueEntityID): Result<Question> {
        const guardResult = Guard.againstNullOrUndefinedBulk([
            { argument: props.title, argumentName: 'title' },
        ]);

        if (guardResult.isFailure) {
            return Result.fail<Question>(guardResult.getErrorValue())
        }

        const isNewTitle = !!id === false;
        const test = new Question({
            ...props,
        }, id);

        // if (isNewUser) {
        //     user.addDomainEvent(new UserCreated(user));
        // }

        return Result.ok<Question>(test);
    }
}