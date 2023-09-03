import { Sequelize } from 'sequelize-typescript';

import { optionsSequelize } from './shared/infra/database/sequelize/config'

import { Indicator } from './shared/infra/database/sequelize/models/indicator.entity'
import { Label } from './shared/infra/database/sequelize/models/label.entity'
import { Question } from './shared/infra/database/sequelize/models/question.entity'
import { QuestionIndicator } from './shared/infra/database/sequelize/models/questionIndicator.entity'
import { Range } from './shared/infra/database/sequelize/models/range.entity'
import { RangeLabel } from './shared/infra/database/sequelize/models/rangeLabel.entity'
import { Test } from './shared/infra/database/sequelize/models/test.entity'
import { Variant } from './shared/infra/database/sequelize/models/variant.entity'

import { CreateTestUserUseCase } from './modules/test/useCases/createTest/CreateTest.useCase'
import { SequelizeTestRepo } from './modules/test/repos/implementations/sequelizeUserRepo'
import { CreateTestDTOResponse } from './modules/test/useCases/createTest/CreateTest.dto'

import { CreateIndicatorUseCase } from './modules/indicator/useCases/createIndicator/CreateIndicator.useCase'
import { SequelizeIndicatorRepo } from './modules/indicator/repos/implementations/sequelizeIndicatorRepo'
import { CreateIndicatorDTOResponse } from './modules/indicator/useCases/createIndicator/CreateIndicator.dto'

import { CreateRangeUseCase } from './modules/range/useCases/createRange/CreateRange.useCase'
import { SequelizeRangeRepo } from './modules/range/repos/implementations/sequelizeRangeRepo'
import { CreateRangeDTOResponse } from './modules/range/useCases/createRange/CreateRange.dto'

import { CreateLabelUseCase } from './modules/label/useCases/createLabel/createLabel.useCase'
import { SequelizeLabelRepo } from './modules/label/repos/implementations/sequelizeLabelRepo'
import { CreateLabelDTOResponse } from './modules/label/useCases/createLabel/createLabel.dto'


const main = async () => {
    const conn = new Sequelize(optionsSequelize)

    await conn.authenticate()
    await conn.sync({ force: true })
    const indicatorModel = conn.models.Indicator
    const labelModel = conn.models.Label
    const questionModel = conn.models.Question
    const questionIndicatorModel = conn.models.QuestionIndicator
    const rangeModel = conn.models.Range
    const rangeLabelModel = conn.models.RangeLabel
    const testModel = conn.models.Test
    const variantModel = conn.models.Variant


    const testRepo = new SequelizeTestRepo(Test)
    const indicatorRepo = new SequelizeIndicatorRepo(Indicator)
    const rangeRepo = new SequelizeRangeRepo(Range)
    const labelRepo = new SequelizeLabelRepo(Label)

    const test1 = await new CreateTestUserUseCase(testRepo).execute({ title: "tset1" })

    const indicator1 = await new CreateIndicatorUseCase(indicatorRepo, testRepo).execute({ title: "indicator1", testId: (test1.value.getValue() as CreateTestDTOResponse).id })

    const range1 = await new CreateRangeUseCase(rangeRepo, indicatorRepo).execute({ title: "range1", min: 0, max: 10, description: "description", indicatorId: (indicator1.value.getValue() as CreateIndicatorDTOResponse).id })

    const label1 = await new CreateLabelUseCase(labelRepo).execute({ title: "label1" })

    await rangeLabelModel.create({ rangeId: (range1.value.getValue() as CreateRangeDTOResponse).id, labelId: (label1.value.getValue() as CreateLabelDTOResponse).id })

    const result = await testModel.findAll({
        include: [{
            model: Indicator,
            include: [{ model: Range, include: [{ model: Label, through: { as: "RangeLabel" } }] }]
        }]
    })
    //@ts-ignore
    console.log(result[0].indicators[0].ranges[0].label)
}

main().then()