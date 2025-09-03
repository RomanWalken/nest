"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserCourseSettingsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const user_course_settings_schema_1 = require("./schemas/user-course-settings.schema");
let UserCourseSettingsService = class UserCourseSettingsService {
    constructor(userCourseSettingsModel) {
        this.userCourseSettingsModel = userCourseSettingsModel;
    }
    async create(createUserCourseSettingsDto) {
        if (!mongoose_2.Types.ObjectId.isValid(createUserCourseSettingsDto.userId)) {
            throw new common_1.BadRequestException('Невалидный ID пользователя');
        }
        if (!mongoose_2.Types.ObjectId.isValid(createUserCourseSettingsDto.courseId)) {
            throw new common_1.BadRequestException('Невалидный ID курса');
        }
        const existing = await this.userCourseSettingsModel.findOne({
            userId: createUserCourseSettingsDto.userId,
            courseId: createUserCourseSettingsDto.courseId,
        });
        if (existing) {
            throw new common_1.BadRequestException('Настройки для этого студента и курса уже существуют');
        }
        const settings = new this.userCourseSettingsModel({
            ...createUserCourseSettingsDto,
            lastModified: new Date(),
        });
        return settings.save();
    }
    async findAll(paginationDto, courseId, userId, isActive) {
        const { page = 1, limit = 10 } = paginationDto;
        const skip = (page - 1) * limit;
        const filter = {};
        if (courseId) {
            if (!mongoose_2.Types.ObjectId.isValid(courseId)) {
                throw new common_1.BadRequestException('Невалидный ID курса');
            }
            filter.courseId = courseId;
        }
        if (userId) {
            if (!mongoose_2.Types.ObjectId.isValid(userId)) {
                throw new common_1.BadRequestException('Невалидный ID пользователя');
            }
            filter.userId = userId;
        }
        if (isActive !== undefined) {
            filter.isActive = isActive;
        }
        const [data, total] = await Promise.all([
            this.userCourseSettingsModel
                .find(filter)
                .populate('userId', 'firstName lastName email')
                .populate('courseId', 'title slug kind')
                .populate('createdBy', 'firstName lastName email')
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limit)
                .exec(),
            this.userCourseSettingsModel.countDocuments(filter),
        ]);
        return {
            data,
            meta: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit),
            },
        };
    }
    async findOne(id) {
        if (!mongoose_2.Types.ObjectId.isValid(id)) {
            throw new common_1.BadRequestException('Невалидный ID настроек');
        }
        const settings = await this.userCourseSettingsModel
            .findById(id)
            .populate('userId', 'firstName lastName email')
            .populate('courseId', 'title slug kind')
            .populate('createdBy', 'firstName lastName email')
            .exec();
        if (!settings) {
            throw new common_1.NotFoundException('Настройки не найдены');
        }
        return settings;
    }
    async findByUserAndCourse(userId, courseId) {
        if (!mongoose_2.Types.ObjectId.isValid(userId)) {
            throw new common_1.BadRequestException('Невалидный ID пользователя');
        }
        if (!mongoose_2.Types.ObjectId.isValid(courseId)) {
            throw new common_1.BadRequestException('Невалидный ID курса');
        }
        return this.userCourseSettingsModel
            .findOne({ userId, courseId })
            .populate('userId', 'firstName lastName email')
            .populate('courseId', 'title slug kind')
            .populate('createdBy', 'firstName lastName email')
            .exec();
    }
    async update(id, updateUserCourseSettingsDto) {
        if (!mongoose_2.Types.ObjectId.isValid(id)) {
            throw new common_1.BadRequestException('Невалидный ID настроек');
        }
        const settings = await this.userCourseSettingsModel
            .findByIdAndUpdate(id, {
            ...updateUserCourseSettingsDto,
            lastModified: new Date()
        }, { new: true })
            .populate('userId', 'firstName lastName email')
            .populate('courseId', 'title slug kind')
            .populate('createdBy', 'firstName lastName email')
            .exec();
        if (!settings) {
            throw new common_1.NotFoundException('Настройки не найдены');
        }
        return settings;
    }
    async remove(id) {
        if (!mongoose_2.Types.ObjectId.isValid(id)) {
            throw new common_1.BadRequestException('Невалидный ID настроек');
        }
        const result = await this.userCourseSettingsModel.findByIdAndDelete(id).exec();
        if (!result) {
            throw new common_1.NotFoundException('Настройки не найдены');
        }
    }
    async findByCourse(courseId) {
        if (!mongoose_2.Types.ObjectId.isValid(courseId)) {
            throw new common_1.BadRequestException('Невалидный ID курса');
        }
        return this.userCourseSettingsModel
            .find({ courseId })
            .populate('userId', 'firstName lastName email')
            .populate('createdBy', 'firstName lastName email')
            .sort({ createdAt: -1 })
            .exec();
    }
    async findByUser(userId) {
        if (!mongoose_2.Types.ObjectId.isValid(userId)) {
            throw new common_1.BadRequestException('Невалидный ID пользователя');
        }
        return this.userCourseSettingsModel
            .find({ userId })
            .populate('courseId', 'title slug kind')
            .populate('createdBy', 'firstName lastName email')
            .sort({ createdAt: -1 })
            .exec();
    }
    async addWorkoutOverride(settingsId, workoutOverride) {
        if (!mongoose_2.Types.ObjectId.isValid(settingsId)) {
            throw new common_1.BadRequestException('Невалидный ID настроек');
        }
        const settings = await this.userCourseSettingsModel
            .findByIdAndUpdate(settingsId, {
            $addToSet: { workoutOverrides: workoutOverride },
            lastModified: new Date()
        }, { new: true })
            .populate('userId', 'firstName lastName email')
            .populate('courseId', 'title slug kind')
            .exec();
        if (!settings) {
            throw new common_1.NotFoundException('Настройки не найдены');
        }
        return settings;
    }
    async updateWorkoutOverride(settingsId, workoutId, updateData) {
        if (!mongoose_2.Types.ObjectId.isValid(settingsId)) {
            throw new common_1.BadRequestException('Невалидный ID настроек');
        }
        if (!mongoose_2.Types.ObjectId.isValid(workoutId)) {
            throw new common_1.BadRequestException('Невалидный ID тренировки');
        }
        const settings = await this.userCourseSettingsModel
            .findOneAndUpdate({
            _id: settingsId,
            'workoutOverrides.workoutId': workoutId
        }, {
            $set: {
                'workoutOverrides.$': { ...updateData, workoutId },
                lastModified: new Date()
            }
        }, { new: true })
            .populate('userId', 'firstName lastName email')
            .populate('courseId', 'title slug kind')
            .exec();
        if (!settings) {
            throw new common_1.NotFoundException('Настройки или переопределение тренировки не найдены');
        }
        return settings;
    }
    async removeWorkoutOverride(settingsId, workoutId) {
        if (!mongoose_2.Types.ObjectId.isValid(settingsId)) {
            throw new common_1.BadRequestException('Невалидный ID настроек');
        }
        if (!mongoose_2.Types.ObjectId.isValid(workoutId)) {
            throw new common_1.BadRequestException('Невалидный ID тренировки');
        }
        const settings = await this.userCourseSettingsModel
            .findByIdAndUpdate(settingsId, {
            $pull: { workoutOverrides: { workoutId } },
            lastModified: new Date()
        }, { new: true })
            .populate('userId', 'firstName lastName email')
            .populate('courseId', 'title slug kind')
            .exec();
        if (!settings) {
            throw new common_1.NotFoundException('Настройки не найдены');
        }
        return settings;
    }
    async addExerciseOverride(settingsId, exerciseOverride) {
        if (!mongoose_2.Types.ObjectId.isValid(settingsId)) {
            throw new common_1.BadRequestException('Невалидный ID настроек');
        }
        const settings = await this.userCourseSettingsModel
            .findByIdAndUpdate(settingsId, {
            $addToSet: { exerciseOverrides: exerciseOverride },
            lastModified: new Date()
        }, { new: true })
            .populate('userId', 'firstName lastName email')
            .populate('courseId', 'title slug kind')
            .exec();
        if (!settings) {
            throw new common_1.NotFoundException('Настройки не найдены');
        }
        return settings;
    }
    async updateExerciseOverride(settingsId, exerciseId, updateData) {
        if (!mongoose_2.Types.ObjectId.isValid(settingsId)) {
            throw new common_1.BadRequestException('Невалидный ID настроек');
        }
        if (!mongoose_2.Types.ObjectId.isValid(exerciseId)) {
            throw new common_1.BadRequestException('Невалидный ID упражнения');
        }
        const settings = await this.userCourseSettingsModel
            .findOneAndUpdate({
            _id: settingsId,
            'exerciseOverrides.exerciseId': exerciseId
        }, {
            $set: {
                'exerciseOverrides.$': { ...updateData, exerciseId },
                lastModified: new Date()
            }
        }, { new: true })
            .populate('userId', 'firstName lastName email')
            .populate('courseId', 'title slug kind')
            .exec();
        if (!settings) {
            throw new common_1.NotFoundException('Настройки или переопределение упражнения не найдены');
        }
        return settings;
    }
    async removeExerciseOverride(settingsId, exerciseId) {
        if (!mongoose_2.Types.ObjectId.isValid(settingsId)) {
            throw new common_1.BadRequestException('Невалидный ID настроек');
        }
        if (!mongoose_2.Types.ObjectId.isValid(exerciseId)) {
            throw new common_1.BadRequestException('Невалидный ID упражнения');
        }
        const settings = await this.userCourseSettingsModel
            .findByIdAndUpdate(settingsId, {
            $pull: { exerciseOverrides: { exerciseId } },
            lastModified: new Date()
        }, { new: true })
            .populate('userId', 'firstName lastName email')
            .populate('courseId', 'title slug kind')
            .exec();
        if (!settings) {
            throw new common_1.NotFoundException('Настройки не найдены');
        }
        return settings;
    }
    async addLessonOverride(settingsId, lessonOverride) {
        if (!mongoose_2.Types.ObjectId.isValid(settingsId)) {
            throw new common_1.BadRequestException('Невалидный ID настроек');
        }
        const settings = await this.userCourseSettingsModel
            .findByIdAndUpdate(settingsId, {
            $addToSet: { lessonOverrides: lessonOverride },
            lastModified: new Date()
        }, { new: true })
            .populate('userId', 'firstName lastName email')
            .populate('courseId', 'title slug kind')
            .exec();
        if (!settings) {
            throw new common_1.NotFoundException('Настройки не найдены');
        }
        return settings;
    }
    async updateLessonOverride(settingsId, lessonId, updateData) {
        if (!mongoose_2.Types.ObjectId.isValid(settingsId)) {
            throw new common_1.BadRequestException('Невалидный ID настроек');
        }
        if (!mongoose_2.Types.ObjectId.isValid(lessonId)) {
            throw new common_1.BadRequestException('Невалидный ID урока');
        }
        const settings = await this.userCourseSettingsModel
            .findOneAndUpdate({
            _id: settingsId,
            'lessonOverrides.lessonId': lessonId
        }, {
            $set: {
                'lessonOverrides.$': { ...updateData, lessonId },
                lastModified: new Date()
            }
        }, { new: true })
            .populate('userId', 'firstName lastName email')
            .populate('courseId', 'title slug kind')
            .exec();
        if (!settings) {
            throw new common_1.NotFoundException('Настройки или переопределение урока не найдены');
        }
        return settings;
    }
    async removeLessonOverride(settingsId, lessonId) {
        if (!mongoose_2.Types.ObjectId.isValid(settingsId)) {
            throw new common_1.BadRequestException('Невалидный ID настроек');
        }
        if (!mongoose_2.Types.ObjectId.isValid(lessonId)) {
            throw new common_1.BadRequestException('Невалидный ID урока');
        }
        const settings = await this.userCourseSettingsModel
            .findByIdAndUpdate(settingsId, {
            $pull: { lessonOverrides: { lessonId } },
            lastModified: new Date()
        }, { new: true })
            .populate('userId', 'firstName lastName email')
            .populate('courseId', 'title slug kind')
            .exec();
        if (!settings) {
            throw new common_1.NotFoundException('Настройки не найдены');
        }
        return settings;
    }
    async getMergedSettings(userId, courseId) {
        const userSettings = await this.findByUserAndCourse(userId, courseId);
        if (!userSettings) {
            return {
                hasPersonalSettings: false,
                settings: null
            };
        }
        return {
            hasPersonalSettings: true,
            settings: userSettings
        };
    }
};
exports.UserCourseSettingsService = UserCourseSettingsService;
exports.UserCourseSettingsService = UserCourseSettingsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_course_settings_schema_1.UserCourseSettings.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], UserCourseSettingsService);
//# sourceMappingURL=user-course-settings.service.js.map