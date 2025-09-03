import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
  Request,
  BadRequestException,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery, ApiParam } from '@nestjs/swagger';
import { ExercisesService } from './exercises.service';
import { CreateExerciseDto } from './dto/create-exercise.dto';
import { UpdateExerciseDto } from './dto/update-exercise.dto';
import { PaginationDto } from '@/common/types';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '@/common/types';
import { Types } from 'mongoose';

@ApiTags('exercises')
@Controller('exercises')
export class ExercisesController {
  constructor(private readonly exercisesService: ExercisesService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.TEACHER, UserRole.MODERATOR, UserRole.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ 
    summary: 'Создать новое упражнение',
    description: 'Создает новое упражнение для фитнес-курсов. Требует права TEACHER, MODERATOR или ADMIN.'
  })
  @ApiResponse({ 
    status: 201, 
    description: 'Упражнение успешно создано',
    schema: {
      example: {
        _id: '507f1f77bcf86cd799439011',
        title: 'Приседания с собственным весом',
        description: 'Базовое упражнение для развития мышц ног',
        repetitions: 15,
        sets: 3,
        duration: 30,
        restTime: 60,
        targetMuscles: ['квадрицепсы', 'ягодичные мышцы'],
        equipment: [],
        createdAt: '2024-01-15T10:30:00.000Z',
        updatedAt: '2024-01-15T10:30:00.000Z'
      }
    }
  })
  @ApiResponse({ status: 400, description: 'Неверные данные или валидация не пройдена' })
  @ApiResponse({ status: 401, description: 'Пользователь не авторизован' })
  @ApiResponse({ status: 403, description: 'Недостаточно прав для создания упражнения' })
  create(@Body() createExerciseDto: CreateExerciseDto) {
    return this.exercisesService.create(createExerciseDto);
  }

  @Get()
  @ApiOperation({ 
    summary: 'Получить список упражнений',
    description: 'Возвращает список упражнений с пагинацией. Поддерживает фильтрацию по целевым мышцам, оборудованию и пользователю.'
  })
  @ApiQuery({ name: 'page', required: false, description: 'Номер страницы (по умолчанию 1)', example: 1 })
  @ApiQuery({ name: 'limit', required: false, description: 'Количество упражнений на странице (по умолчанию 10)', example: 10 })
  @ApiQuery({ name: 'targetMuscles', required: false, description: 'Фильтр по целевым мышцам', example: 'квадрицепсы,ягодичные мышцы' })
  @ApiQuery({ name: 'equipment', required: false, description: 'Фильтр по оборудованию (ID через запятую)', example: '507f1f77bcf86cd799439011,507f1f77bcf86cd799439012' })
  @ApiQuery({ name: 'customUserId', required: false, description: 'Фильтр по пользовательским упражнениям', example: '507f1f77bcf86cd799439013' })
  @ApiResponse({ 
    status: 200, 
    description: 'Список упражнений получен',
    schema: {
      example: {
        data: [
          {
            _id: '507f1f77bcf86cd799439011',
            title: 'Приседания с собственным весом',
            repetitions: 15,
            sets: 3,
            targetMuscles: ['квадрицепсы', 'ягодичные мышцы'],
            equipment: []
          }
        ],
        meta: {
          page: 1,
          limit: 10,
          total: 1,
          totalPages: 1
        }
      }
    }
  })
  findAll(
    @Query() paginationDto: PaginationDto,
    @Query('targetMuscles') targetMuscles?: string,
    @Query('equipment') equipment?: string,
    @Query('customUserId') customUserId?: string,
  ) {
    const targetMusclesArray = targetMuscles ? targetMuscles.split(',') : undefined;
    const equipmentArray = equipment ? equipment.split(',') : undefined;
    
    return this.exercisesService.findAll(
      paginationDto, 
      targetMusclesArray, 
      equipmentArray, 
      customUserId
    );
  }

  @Get('target-muscles')
  @ApiOperation({ 
    summary: 'Получить список доступных целевых мышц',
    description: 'Возвращает список всех уникальных целевых мышц из упражнений.'
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Список целевых мышц получен',
    schema: {
      example: ['квадрицепсы', 'ягодичные мышцы', 'икроножные мышцы', 'бицепсы', 'трицепсы']
    }
  })
  getAvailableTargetMuscles() {
    return this.exercisesService.getAvailableTargetMuscles();
  }

  @Get('by-target-muscles')
  @ApiOperation({ 
    summary: 'Получить упражнения по целевым мышцам',
    description: 'Возвращает упражнения, которые тренируют указанные мышцы.'
  })
  @ApiQuery({ name: 'muscles', required: true, description: 'Целевые мышцы через запятую', example: 'квадрицепсы,ягодичные мышцы' })
  @ApiResponse({ status: 200, description: 'Список упражнений по целевым мышцам получен' })
  findByTargetMuscles(@Query('muscles') muscles: string) {
    const musclesArray = muscles.split(',');
    return this.exercisesService.findByTargetMuscles(musclesArray);
  }

  @Get('by-equipment')
  @ApiOperation({ 
    summary: 'Получить упражнения по оборудованию',
    description: 'Возвращает упражнения, которые используют указанное оборудование.'
  })
  @ApiQuery({ name: 'equipmentIds', required: true, description: 'ID оборудования через запятую', example: '507f1f77bcf86cd799439011,507f1f77bcf86cd799439012' })
  @ApiResponse({ status: 200, description: 'Список упражнений по оборудованию получен' })
  @ApiResponse({ status: 400, description: 'Невалидный ID оборудования' })
  findByEquipment(@Query('equipmentIds') equipmentIds: string) {
    const equipmentArray = equipmentIds.split(',');
    return this.exercisesService.findByEquipment(equipmentArray);
  }

  @Get('custom/:customUserId')
  @ApiOperation({ 
    summary: 'Получить пользовательские упражнения',
    description: 'Возвращает упражнения, созданные для конкретного пользователя.'
  })
  @ApiParam({ name: 'customUserId', description: 'ID пользователя', example: '507f1f77bcf86cd799439011' })
  @ApiResponse({ status: 200, description: 'Список пользовательских упражнений получен' })
  @ApiResponse({ status: 400, description: 'Невалидный ID пользователя' })
  findByCustomUser(@Param('customUserId') customUserId: string) {
    if (!Types.ObjectId.isValid(customUserId)) {
      throw new BadRequestException(`Невалидный ID пользователя: ${customUserId}`);
    }
    return this.exercisesService.findByCustomUser(customUserId);
  }

  @Get(':id')
  @ApiOperation({ 
    summary: 'Получить упражнение по ID',
    description: 'Возвращает детальную информацию об упражнении, включая оборудование.'
  })
  @ApiParam({ name: 'id', description: 'ID упражнения (24-символьная hex строка)', example: '507f1f77bcf86cd799439011' })
  @ApiResponse({ status: 200, description: 'Упражнение найдено' })
  @ApiResponse({ status: 400, description: 'Невалидный ID упражнения' })
  @ApiResponse({ status: 404, description: 'Упражнение не найдено' })
  findOne(@Param('id') id: string) {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException(`Невалидный ID упражнения: ${id}`);
    }
    return this.exercisesService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.TEACHER, UserRole.MODERATOR, UserRole.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ 
    summary: 'Обновить упражнение',
    description: 'Обновляет информацию об упражнении. Требует права TEACHER, MODERATOR или ADMIN.'
  })
  @ApiParam({ name: 'id', description: 'ID упражнения (24-символьная hex строка)', example: '507f1f77bcf86cd799439011' })
  @ApiResponse({ status: 200, description: 'Упражнение успешно обновлено' })
  @ApiResponse({ status: 400, description: 'Невалидный ID упражнения' })
  @ApiResponse({ status: 401, description: 'Пользователь не авторизован' })
  @ApiResponse({ status: 403, description: 'Недостаточно прав для обновления упражнения' })
  @ApiResponse({ status: 404, description: 'Упражнение не найдено' })
  update(@Param('id') id: string, @Body() updateExerciseDto: UpdateExerciseDto) {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException(`Невалидный ID упражнения: ${id}`);
    }
    return this.exercisesService.update(id, updateExerciseDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.TEACHER, UserRole.MODERATOR, UserRole.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ 
    summary: 'Удалить упражнение',
    description: 'Удаляет упражнение. Требует права TEACHER, MODERATOR или ADMIN.'
  })
  @ApiParam({ name: 'id', description: 'ID упражнения (24-символьная hex строка)', example: '507f1f77bcf86cd799439011' })
  @ApiResponse({ status: 200, description: 'Упражнение успешно удалено' })
  @ApiResponse({ status: 400, description: 'Невалидный ID упражнения' })
  @ApiResponse({ status: 401, description: 'Пользователь не авторизован' })
  @ApiResponse({ status: 403, description: 'Недостаточно прав для удаления упражнения' })
  @ApiResponse({ status: 404, description: 'Упражнение не найдено' })
  remove(@Param('id') id: string) {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException(`Невалидный ID упражнения: ${id}`);
    }
    return this.exercisesService.remove(id);
  }

  @Post(':id/equipment/:equipmentId')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.TEACHER, UserRole.MODERATOR, UserRole.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ 
    summary: 'Добавить оборудование к упражнению',
    description: 'Добавляет оборудование к упражнению. Требует права TEACHER, MODERATOR или ADMIN.'
  })
  @ApiParam({ name: 'id', description: 'ID упражнения', example: '507f1f77bcf86cd799439011' })
  @ApiParam({ name: 'equipmentId', description: 'ID оборудования', example: '507f1f77bcf86cd799439012' })
  @ApiResponse({ status: 200, description: 'Оборудование успешно добавлено к упражнению' })
  @ApiResponse({ status: 400, description: 'Невалидный ID упражнения или оборудования' })
  @ApiResponse({ status: 401, description: 'Пользователь не авторизован' })
  @ApiResponse({ status: 403, description: 'Недостаточно прав' })
  @ApiResponse({ status: 404, description: 'Упражнение не найдено' })
  addEquipment(@Param('id') id: string, @Param('equipmentId') equipmentId: string) {
    return this.exercisesService.addEquipment(id, equipmentId);
  }

  @Delete(':id/equipment/:equipmentId')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.TEACHER, UserRole.MODERATOR, UserRole.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ 
    summary: 'Убрать оборудование из упражнения',
    description: 'Убирает оборудование из упражнения. Требует права TEACHER, MODERATOR или ADMIN.'
  })
  @ApiParam({ name: 'id', description: 'ID упражнения', example: '507f1f77bcf86cd799439011' })
  @ApiParam({ name: 'equipmentId', description: 'ID оборудования', example: '507f1f77bcf86cd799439012' })
  @ApiResponse({ status: 200, description: 'Оборудование успешно убрано из упражнения' })
  @ApiResponse({ status: 400, description: 'Невалидный ID упражнения или оборудования' })
  @ApiResponse({ status: 401, description: 'Пользователь не авторизован' })
  @ApiResponse({ status: 403, description: 'Недостаточно прав' })
  @ApiResponse({ status: 404, description: 'Упражнение не найдено' })
  removeEquipment(@Param('id') id: string, @Param('equipmentId') equipmentId: string) {
    return this.exercisesService.removeEquipment(id, equipmentId);
  }

  @Post(':id/target-muscles/:muscle')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.TEACHER, UserRole.MODERATOR, UserRole.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ 
    summary: 'Добавить целевую мышцу к упражнению',
    description: 'Добавляет целевую мышцу к упражнению. Требует права TEACHER, MODERATOR или ADMIN.'
  })
  @ApiParam({ name: 'id', description: 'ID упражнения', example: '507f1f77bcf86cd799439011' })
  @ApiParam({ name: 'muscle', description: 'Название целевой мышцы', example: 'квадрицепсы' })
  @ApiResponse({ status: 200, description: 'Целевая мышца успешно добавлена к упражнению' })
  @ApiResponse({ status: 400, description: 'Невалидный ID упражнения' })
  @ApiResponse({ status: 401, description: 'Пользователь не авторизован' })
  @ApiResponse({ status: 403, description: 'Недостаточно прав' })
  @ApiResponse({ status: 404, description: 'Упражнение не найдено' })
  addTargetMuscle(@Param('id') id: string, @Param('muscle') muscle: string) {
    return this.exercisesService.addTargetMuscle(id, muscle);
  }

  @Delete(':id/target-muscles/:muscle')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.TEACHER, UserRole.MODERATOR, UserRole.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ 
    summary: 'Убрать целевую мышцу из упражнения',
    description: 'Убирает целевую мышцу из упражнения. Требует права TEACHER, MODERATOR или ADMIN.'
  })
  @ApiParam({ name: 'id', description: 'ID упражнения', example: '507f1f77bcf86cd799439011' })
  @ApiParam({ name: 'muscle', description: 'Название целевой мышцы', example: 'квадрицепсы' })
  @ApiResponse({ status: 200, description: 'Целевая мышца успешно убрана из упражнения' })
  @ApiResponse({ status: 400, description: 'Невалидный ID упражнения' })
  @ApiResponse({ status: 401, description: 'Пользователь не авторизован' })
  @ApiResponse({ status: 403, description: 'Недостаточно прав' })
  @ApiResponse({ status: 404, description: 'Упражнение не найдено' })
  removeTargetMuscle(@Param('id') id: string, @Param('muscle') muscle: string) {
    return this.exercisesService.removeTargetMuscle(id, muscle);
  }
}
