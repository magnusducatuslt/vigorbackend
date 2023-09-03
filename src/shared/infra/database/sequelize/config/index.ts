import { SequelizeModuleOptions } from '@nestjs/sequelize';

import { Indicator } from '../models/indicator.entity'
import { Label } from '../models/label.entity'
import { Question } from '../models/question.entity'
import { QuestionIndicator } from '../models/questionIndicator.entity'
import { Range } from '../models/range.entity'
import { RangeLabel } from '../models/rangeLabel.entity'
import { Test } from '../models/test.entity'
import { Variant } from '../models/variant.entity'

import { ConfigService } from '@nestjs/config';

const models = [Variant, Test, RangeLabel, Range, QuestionIndicator, Question, Label, Indicator]

export const options = {
    inject: [ConfigService], // Inject ConfigService
    useFactory: async (configService: ConfigService) => ({
        dialect: configService.get<string>('DATABASE_DIALECT'),
        host: configService.get<string>('DATABASE_HOST'),
        port: configService.get<number>('DATABASE_PORT'),
        username: configService.get<string>('DATABASE_USERNAME'),
        password: configService.get<string>('DATABASE_PASSWORD'),
        database: configService.get<string>('DATABASE_NAME'),
        models,
        define: {
            underscored: true,
        },
        synchronize: configService.get<boolean>('DATABASE_SYNCHRONIZE'),
        autoLoadModels: configService.get<boolean>('DATABASE_AUTO_LOAD_MODELS'),
    }),
}

export const optionsSequelize: SequelizeModuleOptions = {
    dialect: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'user',
    password: 'pass',
    database: 'vigorshit',
    models,
    define: {
        underscored: true,
    },
    //TODO remove in production
    synchronize: true,
    autoLoadModels: true,
}