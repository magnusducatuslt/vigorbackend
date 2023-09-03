import { Mapper } from '../../../shared/infra/Mapper'
import { Range } from '../domain/Range';
import { RangeDTO } from '../dtos/rangeDTO';
import { UniqueEntityID } from '../../../shared/domain/UniqueEntityID';
import { Title } from '../domain/title';
import { Max } from '../domain/max'
import { Min } from '../domain/min'
import { Indicator } from '../../indicator/domain/Indicator'
import { IndicatorMap } from '../../indicator/mappers/indicatorMap';
import { LabelMap } from '../../label/mappers/labelMap'
import { Label } from '../../label/domain/Label';

export class RangeMap implements Mapper<Range> {
    public static toDTO(indicator: Range): RangeDTO {
        if (!indicator) {
            return null
        }
        return {
            id: indicator.id.toString(),
            title: indicator.title.value,
            min: indicator.min.value,
            max: indicator.max.value,
            description: indicator.description,
            indicatorId: indicator.indicatorId,
            indicator: IndicatorMap.toDTO(indicator.indicator),
            label: indicator.label.map(lab => LabelMap.toDTO(lab))
        }
    }

    public static toDomain(raw: any): Range {
        const titleOrError = Title.create({ name: raw.title });
        const maxOrError = Max.create({ max: raw.max });
        const minOrError = Min.create({ min: raw.min });

        const indicatorOrError = Range.create({
            title: titleOrError.getValue(),
            max: maxOrError.getValue(),
            min: minOrError.getValue(),
            description: raw.description,
            indicator: raw.indicator ? Indicator.create(raw.indicator) : null,
            label: raw.label ? raw.label.map(lab => Label.create(lab)) : [],
            ...raw


        }, new UniqueEntityID(raw.id));

        indicatorOrError.isFailure ? console.log(indicatorOrError.getErrorValue()) : '';

        return indicatorOrError.isSuccess ? indicatorOrError.getValue() : null;
    }

    public static async toPersistence(indicator: Range): Promise<any> {
        return {
            id: indicator.rangeId.getStringValue(),
            title: indicator.title.value,
            indicatorId: indicator.indicatorId,
            max: indicator.max.value,
            min: indicator.min.value,
            description: indicator.description
        }
    }
}