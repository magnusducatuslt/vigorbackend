import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { SequelizeIndicatorRepo } from './implementations/sequelizeIndicatorRepo'
import { Indicator } from '../../../shared/infra/database/sequelize/models/indicator.entity';

@Module({
    imports: [SequelizeModule.forFeature([Indicator])],
    providers: [SequelizeIndicatorRepo],
    exports: [SequelizeIndicatorRepo]
})

export class ReposModule { }