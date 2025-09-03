"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateStudentProfileDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_student_profile_dto_1 = require("./create-student-profile.dto");
class UpdateStudentProfileDto extends (0, swagger_1.PartialType)(create_student_profile_dto_1.CreateStudentProfileDto) {
}
exports.UpdateStudentProfileDto = UpdateStudentProfileDto;
//# sourceMappingURL=update-student-profile.dto.js.map