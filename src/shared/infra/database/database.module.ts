import { Module } from '@nestjs/common';
import { SequelizeConnModule } from './sequelize/sequelize.module';

@Module({
    imports: [
        SequelizeConnModule,
    ],
    exports: [SequelizeConnModule],
})

export class DatabaseModule { }