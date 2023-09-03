import { Mapper } from '../../../shared/infra/Mapper'

import { IndicatorMap } from '../../indicator/mappers/indicatorMap'

import { QuestionDTO } from '../dtos/questionDTO';
import { UniqueEntityID } from '../../../shared/domain/UniqueEntityID';
import { Title } from '../domain/title';
import { Question } from '../domain/Question'
import { VariantMap } from '../../variant/mappers/variantMap';


export class QuestionMap implements Mapper<Question> {
    public static toDTO(question: Question): QuestionDTO {
        if (!question) {
            return null
        }
        return {
            id: question.id.toString(),
            title: question.title.value,
            indicator: IndicatorMap.toDTO(question.indicator),
            variants: question.variants.map(variant => VariantMap.toDTO(variant))
        }
    }

    public static toDomain(raw: any): Question {
        const titleOrError = Title.create({ name: raw.title });

        const indicatorOrError = Question.create({
            title: titleOrError.getValue(),
            ...raw


        }, new UniqueEntityID(raw.id));

        indicatorOrError.isFailure ? console.log(indicatorOrError.getErrorValue()) : '';

        return indicatorOrError.isSuccess ? indicatorOrError.getValue() : null;
    }

    public static async toPersistence(question: Question): Promise<any> {
        return {
            id: question.questionId.getStringValue(),
            title: question.title.value,
        }
    }
}