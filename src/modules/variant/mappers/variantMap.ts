import { Mapper } from '../../../shared/infra/Mapper'
import { Test } from '../../test/domain/Test';
import { VariantDTO } from '../dtos/variantDTO';
import { UniqueEntityID } from '../../../shared/domain/UniqueEntityID';
import { Title } from '../domain/title';
import { Value } from '../domain/value'
import { Variant } from '../domain/Variant'
import { QuestionMap } from '../../question/mappers/questionMap';


export class VariantMap implements Mapper<Variant> {
    public static toDTO(variant: Variant): VariantDTO {
        return {
            id: variant.id.toString(),
            title: variant.title.value,
            value: variant.value.value,
            questionId: variant.questionId,
            question: QuestionMap.toDTO(variant.question)
        }
    }

    public static toDomain(raw: any): Variant {
        const titleOrError = Title.create({ name: raw.title });
        const valueOrError = Value.create({ value: raw.value })

        const indicatorOrError = Variant.create({
            title: titleOrError.getValue().value,
            questionId: raw.questionId,
            value: valueOrError.getValue().value,
            ...raw
        }, new UniqueEntityID(raw.id));

        indicatorOrError.isFailure ? console.log(indicatorOrError.getErrorValue()) : '';

        return indicatorOrError.isSuccess ? indicatorOrError.getValue() : null;
    }

    public static async toPersistence(indicator: Variant): Promise<any> {
        return {
            id: indicator.variantId.getStringValue(),
            title: indicator.title.value,
            questionId: indicator.questionId,
            value: indicator.value.value
        }
    }
}