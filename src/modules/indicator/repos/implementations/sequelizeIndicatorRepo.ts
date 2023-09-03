import { InjectModel } from '@nestjs/sequelize';
import { Indicator as IndicatorEntity } from '../../../../shared/infra/database/sequelize/models/indicator.entity';

import { IIndicatorRepo } from "../indicatorRepo";
import { Title } from "../../domain/title";
import { Indicator } from "../../domain/Indicator";
import { IndicatorMap } from "../../mappers/indicatorMap";

export class SequelizeIndicatorRepo implements IIndicatorRepo {

    constructor(
        @InjectModel(IndicatorEntity)
        private indicatorModel: typeof IndicatorEntity) {
    }

    async exists(title: Title): Promise<boolean> {
        const baseTest = await this.indicatorModel.findOne({
            where: {
                title: title.value
            }
        });
        return !!baseTest === true;
    }

    async getIndicatorById(indicatorId: string): Promise<Indicator> {

        const baseTest = await this.indicatorModel.findOne({
            where: {
                id: indicatorId
            }
        });
        if (!!baseTest === false) throw new Error("Test not found.")
        return IndicatorMap.toDomain(baseTest);
    }

    async populateIndicatorById(indicatorId: string): Promise<Indicator> {

        const baseTest = await this.indicatorModel.findOne({
            where: {
                id: indicatorId
            }
        });
        if (!!baseTest === false) throw new Error("Test not found.")
        return IndicatorMap.toDomain(baseTest);
    }


    async save(indicator: Indicator): Promise<Indicator> {
        const exists = await this.exists(indicator.title);

        if (!exists) {
            const rawSequelizeTest = await IndicatorMap.toPersistence(indicator);
            const testCreated = await this.indicatorModel.create(rawSequelizeTest);
            return IndicatorMap.toDomain(testCreated);
        }

        return;
    }
}