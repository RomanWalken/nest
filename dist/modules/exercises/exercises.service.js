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
exports.ExercisesService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const exercise_schema_1 = require("./schemas/exercise.schema");
let ExercisesService = class ExercisesService {
    constructor(exerciseModel) {
        this.exerciseModel = exerciseModel;
    }
    async create(createExerciseDto) {
        const exercise = new this.exerciseModel(createExerciseDto);
        return exercise.save();
    }
    async findAll(paginationDto, targetMuscles, equipment, customUserId) {
        const { page = 1, limit = 10 } = paginationDto;
        const skip = (page - 1) * limit;
        const filter = {};
        if (targetMuscles && targetMuscles.length > 0) {
            filter.targetMuscles = { $in: targetMuscles };
        }
        if (equipment && equipment.length > 0) {
            if (!equipment.every(id => mongoose_2.Types.ObjectId.isValid(id))) {
                throw new common_1.BadRequestException('Невалидный ID оборудования');
            }
            filter.equipment = { $in: equipment };
        }
        if (customUserId) {
            if (!mongoose_2.Types.ObjectId.isValid(customUserId)) {
                throw new common_1.BadRequestException('Невалидный ID пользователя');
            }
            filter.customUserId = customUserId;
        }
        const [data, total] = await Promise.all([
            this.exerciseModel
                .find(filter)
                .populate('equipment', 'name type')
                .populate('customUserId', 'firstName lastName email')
                .sort({ title: 1 })
                .skip(skip)
                .limit(limit)
                .exec(),
            this.exerciseModel.countDocuments(filter),
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
            throw new common_1.BadRequestException('Невалидный ID упражнения');
        }
        const exercise = await this.exerciseModel
            .findById(id)
            .populate('equipment', 'name type description')
            .populate('customUserId', 'firstName lastName email')
            .exec();
        if (!exercise) {
            throw new common_1.NotFoundException('Упражнение не найдено');
        }
        return exercise;
    }
    async update(id, updateExerciseDto) {
        if (!mongoose_2.Types.ObjectId.isValid(id)) {
            throw new common_1.BadRequestException('Невалидный ID упражнения');
        }
        const exercise = await this.exerciseModel
            .findByIdAndUpdate(id, updateExerciseDto, { new: true })
            .populate('equipment', 'name type')
            .populate('customUserId', 'firstName lastName email')
            .exec();
        if (!exercise) {
            throw new common_1.NotFoundException('Упражнение не найдено');
        }
        return exercise;
    }
    async remove(id) {
        if (!mongoose_2.Types.ObjectId.isValid(id)) {
            throw new common_1.BadRequestException('Невалидный ID упражнения');
        }
        const result = await this.exerciseModel.findByIdAndDelete(id).exec();
        if (!result) {
            throw new common_1.NotFoundException('Упражнение не найдено');
        }
    }
    async findByTargetMuscles(targetMuscles) {
        return this.exerciseModel
            .find({ targetMuscles: { $in: targetMuscles } })
            .populate('equipment', 'name type')
            .sort({ title: 1 })
            .exec();
    }
    async findByEquipment(equipmentIds) {
        if (!equipmentIds.every(id => mongoose_2.Types.ObjectId.isValid(id))) {
            throw new common_1.BadRequestException('Невалидный ID оборудования');
        }
        return this.exerciseModel
            .find({ equipment: { $in: equipmentIds } })
            .populate('equipment', 'name type')
            .sort({ title: 1 })
            .exec();
    }
    async findByCustomUser(customUserId) {
        if (!mongoose_2.Types.ObjectId.isValid(customUserId)) {
            throw new common_1.BadRequestException('Невалидный ID пользователя');
        }
        return this.exerciseModel
            .find({ customUserId })
            .populate('equipment', 'name type')
            .populate('customUserId', 'firstName lastName email')
            .sort({ title: 1 })
            .exec();
    }
    async addEquipment(exerciseId, equipmentId) {
        if (!mongoose_2.Types.ObjectId.isValid(exerciseId)) {
            throw new common_1.BadRequestException('Невалидный ID упражнения');
        }
        if (!mongoose_2.Types.ObjectId.isValid(equipmentId)) {
            throw new common_1.BadRequestException('Невалидный ID оборудования');
        }
        const exercise = await this.exerciseModel
            .findByIdAndUpdate(exerciseId, { $addToSet: { equipment: equipmentId } }, { new: true })
            .populate('equipment', 'name type')
            .exec();
        if (!exercise) {
            throw new common_1.NotFoundException('Упражнение не найдено');
        }
        return exercise;
    }
    async removeEquipment(exerciseId, equipmentId) {
        if (!mongoose_2.Types.ObjectId.isValid(exerciseId)) {
            throw new common_1.BadRequestException('Невалидный ID упражнения');
        }
        if (!mongoose_2.Types.ObjectId.isValid(equipmentId)) {
            throw new common_1.BadRequestException('Невалидный ID оборудования');
        }
        const exercise = await this.exerciseModel
            .findByIdAndUpdate(exerciseId, { $pull: { equipment: equipmentId } }, { new: true })
            .populate('equipment', 'name type')
            .exec();
        if (!exercise) {
            throw new common_1.NotFoundException('Упражнение не найдено');
        }
        return exercise;
    }
    async addTargetMuscle(exerciseId, muscle) {
        if (!mongoose_2.Types.ObjectId.isValid(exerciseId)) {
            throw new common_1.BadRequestException('Невалидный ID упражнения');
        }
        const exercise = await this.exerciseModel
            .findByIdAndUpdate(exerciseId, { $addToSet: { targetMuscles: muscle } }, { new: true })
            .populate('equipment', 'name type')
            .exec();
        if (!exercise) {
            throw new common_1.NotFoundException('Упражнение не найдено');
        }
        return exercise;
    }
    async removeTargetMuscle(exerciseId, muscle) {
        if (!mongoose_2.Types.ObjectId.isValid(exerciseId)) {
            throw new common_1.BadRequestException('Невалидный ID упражнения');
        }
        const exercise = await this.exerciseModel
            .findByIdAndUpdate(exerciseId, { $pull: { targetMuscles: muscle } }, { new: true })
            .populate('equipment', 'name type')
            .exec();
        if (!exercise) {
            throw new common_1.NotFoundException('Упражнение не найдено');
        }
        return exercise;
    }
    async getAvailableTargetMuscles() {
        const result = await this.exerciseModel.distinct('targetMuscles');
        return result.filter(muscle => muscle && muscle.trim() !== '');
    }
};
exports.ExercisesService = ExercisesService;
exports.ExercisesService = ExercisesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(exercise_schema_1.Exercise.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], ExercisesService);
//# sourceMappingURL=exercises.service.js.map