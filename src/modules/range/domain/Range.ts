import { Title } from './title'
import { Max } from './max'
import { Min } from './min'
import { RangeId } from "./rangeId";

import { Indicator } from '../../indicator/domain/Indicator'
import { Label } from '../../label/domain/Label'

import { UniqueEntityID } from "../../../shared/domain/UniqueEntityID";
import { Result } from "../../../shared/core/Result";
import { Guard } from "../../../shared/core/Guard";
import { AggregateRoot } from "../../../shared/domain/AggregateRoot";

interface RangeProps {
    title: Title,
    min: Min,
    max: Max,
    description: string,
    indicatorId: string,
    indicator?: Indicator,
    label?: Label[];
}

export class Range extends AggregateRoot<RangeProps> {

    get rangeId(): RangeId {
        return RangeId.create(this._id)
            .getValue();
    }

    get indicator(): Indicator {
        return this.props.indicator
    }

    get label(): Label[] {
        return this.props.label
    }

    get title(): Title {
        return this.props.title;
    }

    get min(): Min {
        return this.props.min;
    }

    get max(): Max {
        return this.props.max;
    }

    get indicatorId(): string {
        return this.props.indicatorId;
    }


    get description(): string {
        return this.props.description;
    }

    private constructor(props: RangeProps, id?: UniqueEntityID) {
        super(props, id)
    }

    public static create(props: RangeProps, id?: UniqueEntityID): Result<Range> {
        const guardResult = Guard.againstNullOrUndefinedBulk([
            { argument: props.title, argumentName: 'title' },
        ]);

        if (guardResult.isFailure) {
            return Result.fail<Range>(guardResult.getErrorValue())
        }

        const isNewTitle = !!id === false;
        const test = new Range({
            ...props,
        }, id);

        // if (isNewUser) {
        //     user.addDomainEvent(new UserCreated(user));
        // }

        return Result.ok<Range>(test);
    }
}