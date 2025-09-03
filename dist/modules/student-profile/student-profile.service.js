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
exports.StudentProfileService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const student_profile_schema_1 = require("./schemas/student-profile.schema");
let StudentProfileService = class StudentProfileService {
    constructor(studentProfileModel) {
        this.studentProfileModel = studentProfileModel;
    }
    async create(createStudentProfileDto) {
        if (!mongoose_2.Types.ObjectId.isValid(createStudentProfileDto.userId)) {
            throw new common_1.BadRequestException('Невалидный ID пользователя');
        }
        const existing = await this.studentProfileModel.findOne({
            userId: createStudentProfileDto.userId,
        });
        if (existing) {
            throw new common_1.BadRequestException('Профиль для этого пользователя уже существует');
        }
        const profile = new this.studentProfileModel({
            ...createStudentProfileDto,
            hasCompletedInitialQuiz: true,
            quizCompletedAt: new Date(),
        });
        return profile.save();
    }
    async findAll(paginationDto, hasCompletedQuiz, experienceLevel, primaryGoal) {
        const { page = 1, limit = 10 } = paginationDto;
        const skip = (page - 1) * limit;
        const filter = {};
        if (hasCompletedQuiz !== undefined) {
            filter.hasCompletedInitialQuiz = hasCompletedQuiz;
        }
        if (experienceLevel) {
            filter['fitnessGoals.experienceLevel'] = experienceLevel;
        }
        if (primaryGoal) {
            filter['fitnessGoals.primaryGoal'] = primaryGoal;
        }
        const [data, total] = await Promise.all([
            this.studentProfileModel
                .find(filter)
                .populate('userId', 'firstName lastName email')
                .populate('lastUpdatedBy', 'firstName lastName email')
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limit)
                .exec(),
            this.studentProfileModel.countDocuments(filter),
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
            throw new common_1.BadRequestException('Невалидный ID профиля');
        }
        const profile = await this.studentProfileModel
            .findById(id)
            .populate('userId', 'firstName lastName email')
            .populate('lastUpdatedBy', 'firstName lastName email')
            .exec();
        if (!profile) {
            throw new common_1.NotFoundException('Профиль не найден');
        }
        return profile;
    }
    async findByUserId(userId) {
        if (!mongoose_2.Types.ObjectId.isValid(userId)) {
            throw new common_1.BadRequestException('Невалидный ID пользователя');
        }
        return this.studentProfileModel
            .findOne({ userId })
            .populate('userId', 'firstName lastName email')
            .populate('lastUpdatedBy', 'firstName lastName email')
            .exec();
    }
    async update(id, updateStudentProfileDto) {
        if (!mongoose_2.Types.ObjectId.isValid(id)) {
            throw new common_1.BadRequestException('Невалидный ID профиля');
        }
        const profile = await this.studentProfileModel
            .findByIdAndUpdate(id, {
            ...updateStudentProfileDto,
            lastQuizUpdate: new Date()
        }, { new: true })
            .populate('userId', 'firstName lastName email')
            .populate('lastUpdatedBy', 'firstName lastName email')
            .exec();
        if (!profile) {
            throw new common_1.NotFoundException('Профиль не найден');
        }
        return profile;
    }
    async remove(id) {
        if (!mongoose_2.Types.ObjectId.isValid(id)) {
            throw new common_1.BadRequestException('Невалидный ID профиля');
        }
        const result = await this.studentProfileModel.findByIdAndDelete(id).exec();
        if (!result) {
            throw new common_1.NotFoundException('Профиль не найден');
        }
    }
    async addBodyMeasurements(profileId, measurementsDto) {
        if (!mongoose_2.Types.ObjectId.isValid(profileId)) {
            throw new common_1.BadRequestException('Невалидный ID профиля');
        }
        const profile = await this.studentProfileModel
            .findByIdAndUpdate(profileId, {
            $push: { bodyMeasurements: measurementsDto },
            $set: { currentMeasurements: measurementsDto },
            lastUpdatedBy: measurementsDto.metadata?.updatedBy
        }, { new: true })
            .populate('userId', 'firstName lastName email')
            .exec();
        if (!profile) {
            throw new common_1.NotFoundException('Профиль не найден');
        }
        return profile;
    }
    async getBodyMeasurementsHistory(profileId) {
        if (!mongoose_2.Types.ObjectId.isValid(profileId)) {
            throw new common_1.BadRequestException('Невалидный ID профиля');
        }
        const profile = await this.studentProfileModel
            .findById(profileId)
            .select('bodyMeasurements')
            .exec();
        if (!profile) {
            throw new common_1.NotFoundException('Профиль не найден');
        }
        return profile.bodyMeasurements.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    }
    async updateFitnessGoals(profileId, goalsUpdate) {
        if (!mongoose_2.Types.ObjectId.isValid(profileId)) {
            throw new common_1.BadRequestException('Невалидный ID профиля');
        }
        const profile = await this.studentProfileModel
            .findByIdAndUpdate(profileId, {
            $set: {
                'fitnessGoals': { ...goalsUpdate },
                lastQuizUpdate: new Date()
            }
        }, { new: true })
            .populate('userId', 'firstName lastName email')
            .exec();
        if (!profile) {
            throw new common_1.NotFoundException('Профиль не найден');
        }
        return profile;
    }
    async markQuizCompleted(profileId) {
        if (!mongoose_2.Types.ObjectId.isValid(profileId)) {
            throw new common_1.BadRequestException('Невалидный ID профиля');
        }
        const profile = await this.studentProfileModel
            .findByIdAndUpdate(profileId, {
            hasCompletedInitialQuiz: true,
            quizCompletedAt: new Date(),
            lastQuizUpdate: new Date()
        }, { new: true })
            .populate('userId', 'firstName lastName email')
            .exec();
        if (!profile) {
            throw new common_1.NotFoundException('Профиль не найден');
        }
        return profile;
    }
    async addAchievement(profileId, achievement) {
        if (!mongoose_2.Types.ObjectId.isValid(profileId)) {
            throw new common_1.BadRequestException('Невалидный ID профиля');
        }
        const profile = await this.studentProfileModel
            .findByIdAndUpdate(profileId, {
            $addToSet: { achievements: achievement }
        }, { new: true })
            .populate('userId', 'firstName lastName email')
            .exec();
        if (!profile) {
            throw new common_1.NotFoundException('Профиль не найден');
        }
        return profile;
    }
    async enrollInFitnessCourse(profileId, courseId) {
        if (!mongoose_2.Types.ObjectId.isValid(profileId)) {
            throw new common_1.BadRequestException('Невалидный ID профиля');
        }
        if (!mongoose_2.Types.ObjectId.isValid(courseId)) {
            throw new common_1.BadRequestException('Невалидный ID курса');
        }
        const profile = await this.studentProfileModel
            .findByIdAndUpdate(profileId, {
            $addToSet: { enrolledFitnessCourses: courseId }
        }, { new: true })
            .populate('userId', 'firstName lastName email')
            .exec();
        if (!profile) {
            throw new common_1.NotFoundException('Профиль не найден');
        }
        return profile;
    }
    async unenrollFromFitnessCourse(profileId, courseId) {
        if (!mongoose_2.Types.ObjectId.isValid(profileId)) {
            throw new common_1.BadRequestException('Невалидный ID профиля');
        }
        if (!mongoose_2.Types.ObjectId.isValid(courseId)) {
            throw new common_1.BadRequestException('Невалидный ID курса');
        }
        const profile = await this.studentProfileModel
            .findByIdAndUpdate(profileId, {
            $pull: { enrolledFitnessCourses: courseId }
        }, { new: true })
            .populate('userId', 'firstName lastName email')
            .exec();
        if (!profile) {
            throw new common_1.NotFoundException('Профиль не найден');
        }
        return profile;
    }
    async getProgressStats(profileId) {
        if (!mongoose_2.Types.ObjectId.isValid(profileId)) {
            throw new common_1.BadRequestException('Невалидный ID профиля');
        }
        const profile = await this.studentProfileModel
            .findById(profileId)
            .select('bodyMeasurements fitnessGoals currentMeasurements')
            .exec();
        if (!profile) {
            throw new common_1.NotFoundException('Профиль не найден');
        }
        const measurements = profile.bodyMeasurements.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
        if (measurements.length < 2) {
            return {
                hasProgress: false,
                message: 'Недостаточно данных для анализа прогресса'
            };
        }
        const first = measurements[0];
        const last = measurements[measurements.length - 1];
        return {
            hasProgress: true,
            period: {
                start: first.date,
                end: last.date,
                days: Math.ceil((new Date(last.date).getTime() - new Date(first.date).getTime()) / (1000 * 60 * 60 * 24))
            },
            weight: {
                start: first.weight,
                current: last.weight,
                change: last.weight - first.weight,
                changePercent: first.weight ? ((last.weight - first.weight) / first.weight * 100).toFixed(2) : 0
            },
            bodyFat: {
                start: first.bodyFat,
                current: last.bodyFat,
                change: last.bodyFat - first.bodyFat,
                changePercent: first.bodyFat ? ((last.bodyFat - first.bodyFat) / first.bodyFat * 100).toFixed(2) : 0
            },
            muscleMass: {
                start: first.muscleMass,
                current: last.muscleMass,
                change: last.muscleMass - first.muscleMass,
                changePercent: first.muscleMass ? ((last.muscleMass - first.muscleMass) / first.muscleMass * 100).toFixed(2) : 0
            },
            measurements: {
                chest: { start: first.chest, current: last.chest, change: last.chest - first.chest },
                waist: { start: first.waist, current: last.waist, change: last.waist - first.waist },
                hips: { start: first.hips, current: last.hips, change: last.hips - first.hips },
                biceps: { start: first.biceps, current: last.biceps, change: last.biceps - first.biceps },
                thigh: { start: first.thigh, current: last.thigh, change: last.thigh - first.thigh }
            }
        };
    }
    async getStudentsByGoal(primaryGoal) {
        return this.studentProfileModel
            .find({ 'fitnessGoals.primaryGoal': primaryGoal })
            .populate('userId', 'firstName lastName email')
            .sort({ createdAt: -1 })
            .exec();
    }
    async getStudentsByExperienceLevel(experienceLevel) {
        return this.studentProfileModel
            .find({ 'fitnessGoals.experienceLevel': experienceLevel })
            .populate('userId', 'firstName lastName email')
            .sort({ createdAt: -1 })
            .exec();
    }
};
exports.StudentProfileService = StudentProfileService;
exports.StudentProfileService = StudentProfileService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(student_profile_schema_1.StudentProfile.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], StudentProfileService);
//# sourceMappingURL=student-profile.service.js.map