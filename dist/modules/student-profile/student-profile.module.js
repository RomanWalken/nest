"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentProfileModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const student_profile_schema_1 = require("./schemas/student-profile.schema");
const student_profile_service_1 = require("./student-profile.service");
const student_profile_controller_1 = require("./student-profile.controller");
let StudentProfileModule = class StudentProfileModule {
};
exports.StudentProfileModule = StudentProfileModule;
exports.StudentProfileModule = StudentProfileModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: student_profile_schema_1.StudentProfile.name, schema: student_profile_schema_1.StudentProfileSchema }
            ])
        ],
        controllers: [student_profile_controller_1.StudentProfileController],
        providers: [student_profile_service_1.StudentProfileService],
        exports: [student_profile_service_1.StudentProfileService],
    })
], StudentProfileModule);
//# sourceMappingURL=student-profile.module.js.map