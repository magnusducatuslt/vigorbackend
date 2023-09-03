import { Mapper } from '../../../shared/infra/Mapper'
import { Test } from '../domain/Test';
import { testDTO } from '../dtos/testDTO';
import { UniqueEntityID } from '../../../shared/domain/UniqueEntityID';
import { Title } from '../domain/title';
import { IndicatorMap } from '../../indicator/mappers/indicatorMap'


export class TestMap implements Mapper<Test> {
    public static toDTO(test: Test): testDTO {
        if (!test) {
            return null
        }
        return {
            id: test.id.toString(),
            title: test.title.value,
            indicators: test.indicators.map(indicator => IndicatorMap.toDTO(indicator))
        }
    }

    public static toDomain(raw: any): Test {
        const titleOrError = Title.create({ name: raw.title });

        const testOrError = Test.create({
            title: titleOrError.getValue(),
            indicators: raw.indicators ? raw.indicators : [],

        }, new UniqueEntityID(raw.id));

        testOrError.isFailure ? console.log(testOrError.getErrorValue()) : '';

        return testOrError.isSuccess ? testOrError.getValue() : null;
    }

    public static async toPersistence(test: Test): Promise<any> {
        return {
            id: test.testId.getStringValue(),
            title: test.title.value,
        }
    }
}