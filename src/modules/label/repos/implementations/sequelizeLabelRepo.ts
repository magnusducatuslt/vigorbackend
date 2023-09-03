import { InjectModel } from '@nestjs/sequelize';
import { Label as LabelEntity } from '../../../../shared/infra/database/sequelize/models/label.entity';

import { ILabelRepo } from "../labelRepo";
import { Title } from "../../domain/title";
import { Label } from "../../domain/Label";
import { LabelMap } from "../../mappers/labelMap";

export class SequelizeLabelRepo implements ILabelRepo {

    constructor(
        @InjectModel(LabelEntity)
        private labelModel: typeof LabelEntity) {
    }

    async exists(title: Title): Promise<boolean> {
        const baseTest = await this.labelModel.findOne({
            where: {
                title: title.value
            }
        });
        return !!baseTest === true;
    }

    async getLabelById(labelId: string): Promise<Label> {

        const baseTest = await this.labelModel.findOne({
            where: {
                id: labelId
            }
        });
        if (!!baseTest === false) throw new Error("Label not found.")
        return LabelMap.toDomain(baseTest);
    }

    async populateLabelById(labelId: string): Promise<Label> {

        const baseTest = await this.labelModel.findOne({
            where: {
                id: labelId
            }
        });
        if (!!baseTest === false) throw new Error("Label not found.")
        return LabelMap.toDomain(baseTest);
    }


    async save(label: Label): Promise<Label> {
        const exists = await this.exists(label.title);

        if (!exists) {
            const rawSequelizeTest = await LabelMap.toPersistence(label);
            const testCreated = await this.labelModel.create(rawSequelizeTest);
            return LabelMap.toDomain(testCreated);
        }

        return;
    }
}