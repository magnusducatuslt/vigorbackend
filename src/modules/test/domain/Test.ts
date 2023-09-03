

import { Title } from './title'
import { Indicator } from '../../indicator/domain/Indicator'
import { TestId } from "./testId";
// import { UserCreated } from "./events/userCreated";

// import { UserLoggedIn } from "./events/userLoggedIn";
// import { UserDeleted } from "./events/userDeleted";
import { UniqueEntityID } from "../../../shared/domain/UniqueEntityID";
import { Result } from "../../../shared/core/Result";
import { Guard } from "../../../shared/core/Guard";
import { AggregateRoot } from "../../../shared/domain/AggregateRoot";

interface TestProps {
    title: Title;
    indicators?: Indicator[]
}

export class Test extends AggregateRoot<TestProps> {

    get testId(): TestId {
        return TestId.create(this._id)
            .getValue();
    }

    get title(): Title {
        return this.props.title;
    }

    get indicators(): Indicator[] {
        return this.props.indicators;
    }

    private constructor(props: TestProps, id?: UniqueEntityID) {
        super(props, id)
    }

    public static create(props: TestProps, id?: UniqueEntityID): Result<Test> {
        const guardResult = Guard.againstNullOrUndefinedBulk([
            { argument: props.title, argumentName: 'title' },
        ]);

        if (guardResult.isFailure) {
            return Result.fail<Test>(guardResult.getErrorValue())
        }

        const isNewTitle = !!id === false;
        const test = new Test({
            ...props,
        }, id);

        // if (isNewUser) {
        //     user.addDomainEvent(new UserCreated(user));
        // }

        return Result.ok<Test>(test);
    }
}