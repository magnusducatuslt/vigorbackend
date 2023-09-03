import { Title } from './title'
import { Test } from '../../test/domain/Test'
import { Range } from "../../range/domain/Range"
import { IndicatorId } from "./indicatorId";
// import { UserCreated } from "./events/userCreated";

// import { UserLoggedIn } from "./events/userLoggedIn";
// import { UserDeleted } from "./events/userDeleted";
import { UniqueEntityID } from "../../../shared/domain/UniqueEntityID";
import { Result } from "../../../shared/core/Result";
import { Guard } from "../../../shared/core/Guard";
import { AggregateRoot } from "../../../shared/domain/AggregateRoot";
import { Question } from 'src/modules/question/domain/Question';

interface IndicatorProps {
    title: Title;
    testId: string
    ranges?: Range[]
    test?: Test
    questions?: Question[]
}

export class Indicator extends AggregateRoot<IndicatorProps> {

    get indicatorId(): IndicatorId {
        return IndicatorId.create(this._id)
            .getValue();
    }

    get title(): Title {
        return this.props.title;
    }

    get testId(): string {
        return this.props.testId
    }

    get ranges(): Range[] {
        return this.props.ranges;
    }

    get test(): Test {
        return this.props.test
    }

    get questions(): Question[] {
        return this.props.questions
    }

    private constructor(props: IndicatorProps, id?: UniqueEntityID) {
        super(props, id)
    }

    public static create(props: IndicatorProps, id?: UniqueEntityID): Result<Indicator> {
        const guardResult = Guard.againstNullOrUndefinedBulk([
            { argument: props.title, argumentName: 'title' },
        ]);

        if (guardResult.isFailure) {
            return Result.fail<Indicator>(guardResult.getErrorValue())
        }

        const isNewTitle = !!id === false;
        const test = new Indicator({
            ...props,
        }, id);

        // if (isNewUser) {
        //     user.addDomainEvent(new UserCreated(user));
        // }

        return Result.ok<Indicator>(test);
    }
}