import { Mapper } from '../../../shared/infra/Mapper'
import { Test } from '../../test/domain/Test';
import { IndicatorDTO } from '../dtos/indicatorDTO';
import { UniqueEntityID } from '../../../shared/domain/UniqueEntityID';
import { Title } from '../domain/title';
import { Indicator } from '../domain/Indicator'
import { TestMap } from '../../test/mappers/testMap';
import { RangeMap } from '../../range/mappers/rangeMap'
import { QuestionMap } from '../../question/mappers/questionMap'

export class IndicatorMap implements Mapper<Indicator> {
    public static toDTO(indicator: Indicator): IndicatorDTO {

        if (!indicator) {
            return null
        }

        return {
            id: indicator.id.toString(),
            title: indicator.title.value,
            testId: indicator.testId,
            test: TestMap.toDTO(indicator.test),
            ranges: indicator.ranges.map(range => RangeMap.toDTO(range)),
            questions: indicator.questions.map(question => QuestionMap.toDTO(question))
        }
    }

    public static toDomain(raw: any): Indicator {
        const titleOrError = Title.create({ name: raw.title });

        const indicatorOrError = Indicator.create({
            title: titleOrError.getValue(),
            testId: raw.testId,
            ranges: raw.ranges ? raw.ranges.map(range => RangeMap.toDomain(range)) : [],
            questions: raw.questions ? raw.questions.map(question => QuestionMap.toDomain(question)) : []
        }, new UniqueEntityID(raw.id));

        indicatorOrError.isFailure ? console.log(indicatorOrError.getErrorValue()) : '';

        return indicatorOrError.isSuccess ? indicatorOrError.getValue() : null;
    }

    public static async toPersistence(indicator: Indicator): Promise<any> {
        return {
            id: indicator.indicatorId.getStringValue(),
            title: indicator.title.value,
            testId: indicator.testId,
        }
    }
}