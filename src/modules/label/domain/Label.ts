import { Title } from './title'
import { LabelId } from "./labelId";
import { Range } from '../../range/domain/Range'
// import { UserCreated } from "./events/userCreated";

// import { UserLoggedIn } from "./events/userLoggedIn";
// import { UserDeleted } from "./events/userDeleted";
import { UniqueEntityID } from "../../../shared/domain/UniqueEntityID";
import { Result } from "../../../shared/core/Result";
import { Guard } from "../../../shared/core/Guard";
import { AggregateRoot } from "../../../shared/domain/AggregateRoot";

interface LabelProps {
    title: Title
    ranges?: Range[]

}

export class Label extends AggregateRoot<LabelProps> {

    get labelId(): LabelId {
        return LabelId.create(this._id)
            .getValue();
    }

    get title(): Title {
        return this.props.title;
    }

    get ranges(): Range[] {
        return this.props.ranges
    }

    private constructor(props: LabelProps, id?: UniqueEntityID) {
        super(props, id)
    }

    public static create(props: LabelProps, id?: UniqueEntityID): Result<Label> {
        const guardResult = Guard.againstNullOrUndefinedBulk([
            { argument: props.title, argumentName: 'title' },
        ]);

        if (guardResult.isFailure) {
            return Result.fail<Label>(guardResult.getErrorValue())
        }

        const isNewTitle = !!id === false;
        const test = new Label({
            ...props,
        }, id);

        // if (isNewUser) {
        //     user.addDomainEvent(new UserCreated(user));
        // }

        return Result.ok<Label>(test);
    }
}