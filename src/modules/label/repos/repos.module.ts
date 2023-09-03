import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { SequelizeLabelRepo } from './implementations/sequelizeLabelRepo'
import { Label } from '../../../shared/infra/database/sequelize/models/label.entity';

@Module({
    imports: [SequelizeModule.forFeature([Label])],
    providers: [SequelizeLabelRepo],
    exports: [SequelizeLabelRepo]
})

export class ReposModule { }