import { Mapper } from '../../../shared/infra/Mapper'

import { LabelDTO } from '../dtos/labelDTO';
import { UniqueEntityID } from '../../../shared/domain/UniqueEntityID';
import { Title } from '../domain/title';
import { Label } from '../domain/Label'
import { RangeMap } from '../../range/mappers/rangeMap';
import { Range } from '../../range/domain/Range'


export class LabelMap implements Mapper<Label> {
    public static toDTO(label: Label): LabelDTO {
        return {
            id: label.id.toString(),
            title: label.title.value,
            ranges: label.ranges.map(range => RangeMap.toDTO(range))
        }
    }

    public static toDomain(raw: any): Label {
        const titleOrError = Title.create({ name: raw.title });

        const indicatorOrError = Label.create({
            title: titleOrError.getValue(),
            ranges: raw.ranges ? raw.ranges.map(range => Range.create(range)) : [],
            ...raw


        }, new UniqueEntityID(raw.id));

        indicatorOrError.isFailure ? console.log(indicatorOrError.getErrorValue()) : '';

        return indicatorOrError.isSuccess ? indicatorOrError.getValue() : null;
    }

    public static async toPersistence(indicator: Label): Promise<any> {
        return {
            id: indicator.labelId.getStringValue(),
            title: indicator.title.value,
        }
    }
}