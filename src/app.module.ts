import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
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
import { TeachersModule } from './modules/teachers/teachers.module';
import { EquipmentModule } from './modules/equipment/equipment.module';
import { WorkoutsModule } from './modules/workouts/workouts.module';
import { ExercisesModule } from './modules/exercises/exercises.module';
import { DoctorsModule } from './modules/doctors/doctors.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    ThrottlerModule.forRoot([{
      ttl: 60000, // 60 секунд
      limit: 100, // максимум 100 запросов за 60 секунд
    }]),
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
    TeachersModule,
    EquipmentModule,
    WorkoutsModule,
    ExercisesModule,
    DoctorsModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {} 