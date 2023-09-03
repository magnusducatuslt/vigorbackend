import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { SequelizeUserRepo } from './implementations/sequelizeUserRepo'
import { User } from '../../../shared/infra/database/sequelize/models/user.entity';

@Module({
    imports: [SequelizeModule.forFeature([User])],
    providers: [SequelizeUserRepo],
    exports: [SequelizeUserRepo]
})

export class ReposModule { }