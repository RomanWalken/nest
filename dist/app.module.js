"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const mongoose_1 = require("@nestjs/mongoose");
const throttler_1 = require("@nestjs/throttler");
const core_1 = require("@nestjs/core");
const auth_module_1 = require("./modules/auth/auth.module");
const users_module_1 = require("./modules/users/users.module");
const companies_module_1 = require("./modules/companies/companies.module");
const courses_module_1 = require("./modules/courses/courses.module");
const modules_module_1 = require("./modules/modules/modules.module");
const lessons_module_1 = require("./modules/lessons/lessons.module");
const tariffs_module_1 = require("./modules/tariffs/tariffs.module");
const meals_module_1 = require("./modules/meals/meals.module");
const progress_module_1 = require("./modules/progress/progress.module");
const purchases_module_1 = require("./modules/purchases/purchases.module");
const teachers_module_1 = require("./modules/teachers/teachers.module");
const equipment_module_1 = require("./modules/equipment/equipment.module");
const workouts_module_1 = require("./modules/workouts/workouts.module");
const exercises_module_1 = require("./modules/exercises/exercises.module");
const doctors_module_1 = require("./modules/doctors/doctors.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                envFilePath: '.env',
            }),
            throttler_1.ThrottlerModule.forRoot([{
                    ttl: 60000,
                    limit: 100,
                }]),
            mongoose_1.MongooseModule.forRoot(process.env.MONGODB_URI || 'mongodb://localhost:27017/online-courses'),
            auth_module_1.AuthModule,
            users_module_1.UsersModule,
            companies_module_1.CompaniesModule,
            courses_module_1.CoursesModule,
            modules_module_1.ModulesModule,
            lessons_module_1.LessonsModule,
            tariffs_module_1.TariffsModule,
            meals_module_1.MealsModule,
            progress_module_1.ProgressModule,
            purchases_module_1.PurchasesModule,
            teachers_module_1.TeachersModule,
            equipment_module_1.EquipmentModule,
            workouts_module_1.WorkoutsModule,
            exercises_module_1.ExercisesModule,
            doctors_module_1.DoctorsModule,
        ],
        providers: [
            {
                provide: core_1.APP_GUARD,
                useClass: throttler_1.ThrottlerGuard,
            },
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map