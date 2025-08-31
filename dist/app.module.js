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
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map