"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserCourseSettingsModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const user_course_settings_schema_1 = require("./schemas/user-course-settings.schema");
const user_course_settings_service_1 = require("./user-course-settings.service");
const user_course_settings_controller_1 = require("./user-course-settings.controller");
let UserCourseSettingsModule = class UserCourseSettingsModule {
};
exports.UserCourseSettingsModule = UserCourseSettingsModule;
exports.UserCourseSettingsModule = UserCourseSettingsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: user_course_settings_schema_1.UserCourseSettings.name, schema: user_course_settings_schema_1.UserCourseSettingsSchema }
            ])
        ],
        controllers: [user_course_settings_controller_1.UserCourseSettingsController],
        providers: [user_course_settings_service_1.UserCourseSettingsService],
        exports: [user_course_settings_service_1.UserCourseSettingsService],
    })
], UserCourseSettingsModule);
//# sourceMappingURL=user-course-settings.module.js.map