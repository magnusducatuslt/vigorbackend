import { InjectModel } from '@nestjs/sequelize';
import { Test as TestEntity } from '../../../../shared/infra/database/sequelize/models/test.entity';

import { ITestRepo } from "../testRepo";
import { Title } from "../../domain/title";
import { Test } from "../../domain/Test";
import { TestMap } from "../../mappers/testMap";

export class SequelizeTestRepo implements ITestRepo {

    constructor(
        @InjectModel(TestEntity)
        private testModel: typeof TestEntity) {
    }

    async exists(title: Title): Promise<boolean> {
        const baseTest = await this.testModel.findOne({
            where: {
                title: title.value
            }
        });
        return !!baseTest === true;
    }

    async getTestByTestId(testId: string): Promise<Test> {

        const baseTest = await this.testModel.findOne({
            where: {
                id: testId
            }
        });
        if (!!baseTest === false) throw new Error("Test not found.")
        return TestMap.toDomain(baseTest);
    }

    async populateTestByTestId(testId: string): Promise<Test> {

        const baseTest = await this.testModel.findOne({
            where: {
                id: testId
            }
        });
        if (!!baseTest === false) throw new Error("Test not found.")
        return TestMap.toDomain(baseTest);
    }


    async save(test: Test): Promise<Test> {
        const exists = await this.exists(test.title);

        if (!exists) {
            const rawSequelizeTest = await TestMap.toPersistence(test);
            const testCreated = await this.testModel.create(rawSequelizeTest);
            return TestMap.toDomain(testCreated);
        }

        return;
    }
}