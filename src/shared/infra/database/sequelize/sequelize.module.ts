import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { options } from './config';
//@ts-ignore
const moduleInited = SequelizeModule.forRootAsync(options)
// const moduleInited = SequelizeModule.forRoot(options)

@Module({
    imports: [
        moduleInited,
    ],
    exports: [moduleInited],
})

export class SequelizeConnModule { }