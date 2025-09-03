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
exports.WorkoutsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const workout_schema_1 = require("./schemas/workout.schema");
let WorkoutsService = class WorkoutsService {
    constructor(workoutModel) {
        this.workoutModel = workoutModel;
    }
    async create(createWorkoutDto) {
        if (!mongoose_2.Types.ObjectId.isValid(createWorkoutDto.courseId)) {
            throw new common_1.BadRequestException('Невалидный ID курса');
        }
        const existingWorkout = await this.workoutModel.findOne({
            courseId: createWorkoutDto.courseId,
            order: createWorkoutDto.order,
        });
        if (existingWorkout) {
            throw new common_1.BadRequestException(`Workout с порядковым номером ${createWorkoutDto.order} уже существует в этом курсе`);
        }
        const workout = new this.workoutModel(createWorkoutDto);
        return workout.save();
    }
    async findAll(paginationDto, courseId, isFree) {
        const { page = 1, limit = 10 } = paginationDto;
        const skip = (page - 1) * limit;
        const filter = {};
        if (courseId) {
            if (!mongoose_2.Types.ObjectId.isValid(courseId)) {
                throw new common_1.BadRequestException('Невалидный ID курса');
            }
            filter.courseId = courseId;
        }
        if (isFree !== undefined) {
            filter.isFree = isFree;
        }
        const [data, total] = await Promise.all([
            this.workoutModel
                .find(filter)
                .populate('courseId', 'title slug')
                .populate('tariffs', 'name newPrice currency')
                .populate('exercises', 'title repetitions sets')
                .sort({ order: 1 })
                .skip(skip)
                .limit(limit)
                .exec(),
            this.workoutModel.countDocuments(filter),
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
            throw new common_1.BadRequestException('Невалидный ID workout');
        }
        const workout = await this.workoutModel
            .findById(id)
            .populate('courseId', 'title slug')
            .populate('tariffs', 'name newPrice currency')
            .populate('exercises', 'title repetitions sets targetMuscles')
            .populate('customUserId', 'firstName lastName email')
            .exec();
        if (!workout) {
            throw new common_1.NotFoundException('Workout не найден');
        }
        return workout;
    }
    async update(id, updateWorkoutDto) {
        if (!mongoose_2.Types.ObjectId.isValid(id)) {
            throw new common_1.BadRequestException('Невалидный ID workout');
        }
        if (updateWorkoutDto.order) {
            const existingWorkout = await this.workoutModel.findOne({
                _id: { $ne: id },
                courseId: updateWorkoutDto.courseId,
                order: updateWorkoutDto.order,
            });
            if (existingWorkout) {
                throw new common_1.BadRequestException(`Workout с порядковым номером ${updateWorkoutDto.order} уже существует в этом курсе`);
            }
        }
        const workout = await this.workoutModel
            .findByIdAndUpdate(id, updateWorkoutDto, { new: true })
            .populate('courseId', 'title slug')
            .populate('tariffs', 'name newPrice currency')
            .populate('exercises', 'title repetitions sets')
            .exec();
        if (!workout) {
            throw new common_1.NotFoundException('Workout не найден');
        }
        return workout;
    }
    async remove(id) {
        if (!mongoose_2.Types.ObjectId.isValid(id)) {
            throw new common_1.BadRequestException('Невалидный ID workout');
        }
        const result = await this.workoutModel.findByIdAndDelete(id).exec();
        if (!result) {
            throw new common_1.NotFoundException('Workout не найден');
        }
    }
    async findByCourse(courseId) {
        if (!mongoose_2.Types.ObjectId.isValid(courseId)) {
            throw new common_1.BadRequestException('Невалидный ID курса');
        }
        return this.workoutModel
            .find({ courseId })
            .populate('exercises', 'title repetitions sets targetMuscles')
            .sort({ order: 1 })
            .exec();
    }
    async findBySchedule(month, week, day, courseId) {
        const filter = { month, week, day };
        if (courseId) {
            if (!mongoose_2.Types.ObjectId.isValid(courseId)) {
                throw new common_1.BadRequestException('Невалидный ID курса');
            }
            filter.courseId = courseId;
        }
        return this.workoutModel
            .find(filter)
            .populate('courseId', 'title slug')
            .populate('exercises', 'title repetitions sets targetMuscles')
            .sort({ order: 1 })
            .exec();
    }
    async addExercise(workoutId, exerciseId) {
        if (!mongoose_2.Types.ObjectId.isValid(workoutId)) {
            throw new common_1.BadRequestException('Невалидный ID workout');
        }
        if (!mongoose_2.Types.ObjectId.isValid(exerciseId)) {
            throw new common_1.BadRequestException('Невалидный ID упражнения');
        }
        const workout = await this.workoutModel
            .findByIdAndUpdate(workoutId, { $addToSet: { exercises: exerciseId } }, { new: true })
            .populate('exercises', 'title repetitions sets targetMuscles')
            .exec();
        if (!workout) {
            throw new common_1.NotFoundException('Workout не найден');
        }
        return workout;
    }
    async removeExercise(workoutId, exerciseId) {
        if (!mongoose_2.Types.ObjectId.isValid(workoutId)) {
            throw new common_1.BadRequestException('Невалидный ID workout');
        }
        if (!mongoose_2.Types.ObjectId.isValid(exerciseId)) {
            throw new common_1.BadRequestException('Невалидный ID упражнения');
        }
        const workout = await this.workoutModel
            .findByIdAndUpdate(workoutId, { $pull: { exercises: exerciseId } }, { new: true })
            .populate('exercises', 'title repetitions sets targetMuscles')
            .exec();
        if (!workout) {
            throw new common_1.NotFoundException('Workout не найден');
        }
        return workout;
    }
    async addTariff(workoutId, tariffId) {
        if (!mongoose_2.Types.ObjectId.isValid(workoutId)) {
            throw new common_1.BadRequestException('Невалидный ID workout');
        }
        if (!mongoose_2.Types.ObjectId.isValid(tariffId)) {
            throw new common_1.BadRequestException('Невалидный ID тарифа');
        }
        const workout = await this.workoutModel
            .findByIdAndUpdate(workoutId, { $addToSet: { tariffs: tariffId } }, { new: true })
            .populate('tariffs', 'name newPrice currency')
            .exec();
        if (!workout) {
            throw new common_1.NotFoundException('Workout не найден');
        }
        return workout;
    }
    async removeTariff(workoutId, tariffId) {
        if (!mongoose_2.Types.ObjectId.isValid(workoutId)) {
            throw new common_1.BadRequestException('Невалидный ID workout');
        }
        if (!mongoose_2.Types.ObjectId.isValid(tariffId)) {
            throw new common_1.BadRequestException('Невалидный ID тарифа');
        }
        const workout = await this.workoutModel
            .findByIdAndUpdate(workoutId, { $pull: { tariffs: tariffId } }, { new: true })
            .populate('tariffs', 'name newPrice currency')
            .exec();
        if (!workout) {
            throw new common_1.NotFoundException('Workout не найден');
        }
        return workout;
    }
};
exports.WorkoutsService = WorkoutsService;
exports.WorkoutsService = WorkoutsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(workout_schema_1.Workout.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], WorkoutsService);
//# sourceMappingURL=workouts.service.js.map