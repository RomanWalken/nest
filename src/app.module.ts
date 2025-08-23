import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { CompaniesModule } from './modules/companies/companies.module';
import { CoursesModule } from './modules/courses/courses.module';
import { ModulesModule } from './modules/modules/modules.module';
import { LessonsModule } from './modules/lessons/lessons.module';
import { TariffsModule } from './modules/tariffs/tariffs.module';
import { MealsModule } from './modules/meals/meals.module';
import { ProgressModule } from './modules/progress/progress.module';
import { PurchasesModule } from './modules/purchases/purchases.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    MongooseModule.forRoot(process.env.MONGODB_URI || 'mongodb://localhost:27017/online-courses'),
    AuthModule,
    UsersModule,
    CompaniesModule,
    CoursesModule,
    ModulesModule,
    LessonsModule,
    TariffsModule,
    MealsModule,
    ProgressModule,
    PurchasesModule,
  ],
})
export class AppModule {} 