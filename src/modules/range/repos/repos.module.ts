import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { SequelizeRangeRepo } from './implementations/sequelizeRangeRepo'
import { Range } from '../../../shared/infra/database/sequelize/models/range.entity';

@Module({
    imports: [SequelizeModule.forFeature([Range])],
    providers: [SequelizeRangeRepo],
    exports: [SequelizeRangeRepo]
})

export class ReposModule { }