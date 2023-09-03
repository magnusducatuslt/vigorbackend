import { InjectModel } from '@nestjs/sequelize';
import { Range as RangeEntity } from '../../../../shared/infra/database/sequelize/models/range.entity';

import { IRangeRepo } from "../rangeRepo";
import { Title } from "../../domain/title";
import { Range } from "../../domain/Range";
import { RangeMap } from "../../mappers/rangeMap";

export class SequelizeRangeRepo implements IRangeRepo {

    constructor(
        @InjectModel(RangeEntity)
        private rangeModel: typeof RangeEntity) {
    }

    async exists(title: Title): Promise<boolean> {
        const baseTest = await this.rangeModel.findOne({
            where: {
                title: title.value
            }
        });
        return !!baseTest === true;
    }

    async getRangeById(rangeId: string): Promise<Range> {

        const baseTest = await this.rangeModel.findOne({
            where: {
                id: rangeId
            }
        });
        if (!!baseTest === false) throw new Error("Range not found.")
        return RangeMap.toDomain(baseTest);
    }

    async populateRangeByRangeId(rangeId: string): Promise<Range> {

        const baseTest = await this.rangeModel.findOne({
            where: {
                id: rangeId
            }
        });
        if (!!baseTest === false) throw new Error("Range not found.")
        return RangeMap.toDomain(baseTest);
    }


    async save(Range: Range): Promise<Range> {
        const exists = await this.exists(Range.title);

        if (!exists) {
            const rawSequelizeTest = await RangeMap.toPersistence(Range);
            const testCreated = await this.rangeModel.create(rawSequelizeTest);
            return RangeMap.toDomain(testCreated);
        }

        return;
    }
}