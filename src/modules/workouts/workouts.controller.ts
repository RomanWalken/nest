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
import { WorkoutsService } from './workouts.service';
import { CreateWorkoutDto } from './dto/create-workout.dto';
import { UpdateWorkoutDto } from './dto/update-workout.dto';
import { PaginationDto } from '@/common/types';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '@/common/types';
import { Types } from 'mongoose';

@ApiTags('workouts')
@Controller('workouts')
export class WorkoutsController {
  constructor(private readonly workoutsService: WorkoutsService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.TEACHER, UserRole.MODERATOR, UserRole.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ 
    summary: 'Создать новую тренировку',
    description: 'Создает новую тренировку для фитнес-курса. Требует права TEACHER, MODERATOR или ADMIN.'
  })
  @ApiResponse({ 
    status: 201, 
    description: 'Тренировка успешно создана',
    schema: {
      example: {
        _id: '507f1f77bcf86cd799439011',
        title: 'Кардио тренировка для начинающих',
        description: 'Интенсивная кардио тренировка для сжигания жира',
        duration: 45,
        order: 1,
        isFree: false,
        courseId: '507f1f77bcf86cd799439012',
        month: 1,
        week: 1,
        day: 1,
        exercises: [],
        tariffs: [],
        createdAt: '2024-01-15T10:30:00.000Z',
        updatedAt: '2024-01-15T10:30:00.000Z'
      }
    }
  })
  @ApiResponse({ status: 400, description: 'Неверные данные или валидация не пройдена' })
  @ApiResponse({ status: 401, description: 'Пользователь не авторизован' })
  @ApiResponse({ status: 403, description: 'Недостаточно прав для создания тренировки' })
  create(@Body() createWorkoutDto: CreateWorkoutDto) {
    return this.workoutsService.create(createWorkoutDto);
  }

  @Get()
  @ApiOperation({ 
    summary: 'Получить список тренировок',
    description: 'Возвращает список тренировок с пагинацией. Поддерживает фильтрацию по курсу и статусу бесплатности.'
  })
  @ApiQuery({ name: 'page', required: false, description: 'Номер страницы (по умолчанию 1)', example: 1 })
  @ApiQuery({ name: 'limit', required: false, description: 'Количество тренировок на странице (по умолчанию 10)', example: 10 })
  @ApiQuery({ name: 'courseId', required: false, description: 'ID курса для фильтрации', example: '507f1f77bcf86cd799439011' })
  @ApiQuery({ name: 'isFree', required: false, description: 'Фильтр по бесплатным тренировкам', example: true })
  @ApiResponse({ 
    status: 200, 
    description: 'Список тренировок получен',
    schema: {
      example: {
        data: [
          {
            _id: '507f1f77bcf86cd799439011',
            title: 'Кардио тренировка для начинающих',
            duration: 45,
            order: 1,
            isFree: false,
            courseId: {
              _id: '507f1f77bcf86cd799439012',
              title: 'Основы фитнеса',
              slug: 'osnovy-fitnesa'
            },
            exercises: [],
            tariffs: []
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
    @Query('courseId') courseId?: string,
    @Query('isFree') isFree?: boolean,
  ) {
    return this.workoutsService.findAll(paginationDto, courseId, isFree);
  }

  @Get('course/:courseId')
  @ApiOperation({ 
    summary: 'Получить тренировки по курсу',
    description: 'Возвращает все тренировки для указанного курса, отсортированные по порядку.'
  })
  @ApiParam({ name: 'courseId', description: 'ID курса', example: '507f1f77bcf86cd799439011' })
  @ApiResponse({ status: 200, description: 'Список тренировок курса получен' })
  @ApiResponse({ status: 400, description: 'Невалидный ID курса' })
  findByCourse(@Param('courseId') courseId: string) {
    if (!Types.ObjectId.isValid(courseId)) {
      throw new BadRequestException(`Невалидный ID курса: ${courseId}`);
    }
    return this.workoutsService.findByCourse(courseId);
  }

  @Get('schedule')
  @ApiOperation({ 
    summary: 'Получить тренировки по расписанию',
    description: 'Возвращает тренировки для указанной даты (месяц, неделя, день).'
  })
  @ApiQuery({ name: 'month', required: true, description: 'Месяц (1-12)', example: 1 })
  @ApiQuery({ name: 'week', required: true, description: 'Неделя в месяце (1-5)', example: 1 })
  @ApiQuery({ name: 'day', required: true, description: 'День недели (1-7)', example: 1 })
  @ApiQuery({ name: 'courseId', required: false, description: 'ID курса для фильтрации', example: '507f1f77bcf86cd799439011' })
  @ApiResponse({ status: 200, description: 'Список тренировок по расписанию получен' })
  findBySchedule(
    @Query('month') month: number,
    @Query('week') week: number,
    @Query('day') day: number,
    @Query('courseId') courseId?: string,
  ) {
    return this.workoutsService.findBySchedule(month, week, day, courseId);
  }

  @Get(':id')
  @ApiOperation({ 
    summary: 'Получить тренировку по ID',
    description: 'Возвращает детальную информацию о тренировке, включая упражнения и тарифы.'
  })
  @ApiParam({ name: 'id', description: 'ID тренировки (24-символьная hex строка)', example: '507f1f77bcf86cd799439011' })
  @ApiResponse({ status: 200, description: 'Тренировка найдена' })
  @ApiResponse({ status: 400, description: 'Невалидный ID тренировки' })
  @ApiResponse({ status: 404, description: 'Тренировка не найдена' })
  findOne(@Param('id') id: string) {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException(`Невалидный ID тренировки: ${id}`);
    }
    return this.workoutsService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.TEACHER, UserRole.MODERATOR, UserRole.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ 
    summary: 'Обновить тренировку',
    description: 'Обновляет информацию о тренировке. Требует права TEACHER, MODERATOR или ADMIN.'
  })
  @ApiParam({ name: 'id', description: 'ID тренировки (24-символьная hex строка)', example: '507f1f77bcf86cd799439011' })
  @ApiResponse({ status: 200, description: 'Тренировка успешно обновлена' })
  @ApiResponse({ status: 400, description: 'Невалидный ID тренировки' })
  @ApiResponse({ status: 401, description: 'Пользователь не авторизован' })
  @ApiResponse({ status: 403, description: 'Недостаточно прав для обновления тренировки' })
  @ApiResponse({ status: 404, description: 'Тренировка не найдена' })
  update(@Param('id') id: string, @Body() updateWorkoutDto: UpdateWorkoutDto) {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException(`Невалидный ID тренировки: ${id}`);
    }
    return this.workoutsService.update(id, updateWorkoutDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.TEACHER, UserRole.MODERATOR, UserRole.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ 
    summary: 'Удалить тренировку',
    description: 'Удаляет тренировку. Требует права TEACHER, MODERATOR или ADMIN.'
  })
  @ApiParam({ name: 'id', description: 'ID тренировки (24-символьная hex строка)', example: '507f1f77bcf86cd799439011' })
  @ApiResponse({ status: 200, description: 'Тренировка успешно удалена' })
  @ApiResponse({ status: 400, description: 'Невалидный ID тренировки' })
  @ApiResponse({ status: 401, description: 'Пользователь не авторизован' })
  @ApiResponse({ status: 403, description: 'Недостаточно прав для удаления тренировки' })
  @ApiResponse({ status: 404, description: 'Тренировка не найдена' })
  remove(@Param('id') id: string) {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException(`Невалидный ID тренировки: ${id}`);
    }
    return this.workoutsService.remove(id);
  }

  @Post(':id/exercises/:exerciseId')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.TEACHER, UserRole.MODERATOR, UserRole.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ 
    summary: 'Добавить упражнение к тренировке',
    description: 'Добавляет упражнение к тренировке. Требует права TEACHER, MODERATOR или ADMIN.'
  })
  @ApiParam({ name: 'id', description: 'ID тренировки', example: '507f1f77bcf86cd799439011' })
  @ApiParam({ name: 'exerciseId', description: 'ID упражнения', example: '507f1f77bcf86cd799439012' })
  @ApiResponse({ status: 200, description: 'Упражнение успешно добавлено к тренировке' })
  @ApiResponse({ status: 400, description: 'Невалидный ID тренировки или упражнения' })
  @ApiResponse({ status: 401, description: 'Пользователь не авторизован' })
  @ApiResponse({ status: 403, description: 'Недостаточно прав' })
  @ApiResponse({ status: 404, description: 'Тренировка не найдена' })
  addExercise(@Param('id') id: string, @Param('exerciseId') exerciseId: string) {
    return this.workoutsService.addExercise(id, exerciseId);
  }

  @Delete(':id/exercises/:exerciseId')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.TEACHER, UserRole.MODERATOR, UserRole.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ 
    summary: 'Убрать упражнение из тренировки',
    description: 'Убирает упражнение из тренировки. Требует права TEACHER, MODERATOR или ADMIN.'
  })
  @ApiParam({ name: 'id', description: 'ID тренировки', example: '507f1f77bcf86cd799439011' })
  @ApiParam({ name: 'exerciseId', description: 'ID упражнения', example: '507f1f77bcf86cd799439012' })
  @ApiResponse({ status: 200, description: 'Упражнение успешно убрано из тренировки' })
  @ApiResponse({ status: 400, description: 'Невалидный ID тренировки или упражнения' })
  @ApiResponse({ status: 401, description: 'Пользователь не авторизован' })
  @ApiResponse({ status: 403, description: 'Недостаточно прав' })
  @ApiResponse({ status: 404, description: 'Тренировка не найдена' })
  removeExercise(@Param('id') id: string, @Param('exerciseId') exerciseId: string) {
    return this.workoutsService.removeExercise(id, exerciseId);
  }

  @Post(':id/tariffs/:tariffId')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.TEACHER, UserRole.MODERATOR, UserRole.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ 
    summary: 'Добавить тариф к тренировке',
    description: 'Добавляет тариф к тренировке. Требует права TEACHER, MODERATOR или ADMIN.'
  })
  @ApiParam({ name: 'id', description: 'ID тренировки', example: '507f1f77bcf86cd799439011' })
  @ApiParam({ name: 'tariffId', description: 'ID тарифа', example: '507f1f77bcf86cd799439012' })
  @ApiResponse({ status: 200, description: 'Тариф успешно добавлен к тренировке' })
  @ApiResponse({ status: 400, description: 'Невалидный ID тренировки или тарифа' })
  @ApiResponse({ status: 401, description: 'Пользователь не авторизован' })
  @ApiResponse({ status: 403, description: 'Недостаточно прав' })
  @ApiResponse({ status: 404, description: 'Тренировка не найдена' })
  addTariff(@Param('id') id: string, @Param('tariffId') tariffId: string) {
    return this.workoutsService.addTariff(id, tariffId);
  }

  @Delete(':id/tariffs/:tariffId')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.TEACHER, UserRole.MODERATOR, UserRole.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ 
    summary: 'Убрать тариф из тренировки',
    description: 'Убирает тариф из тренировки. Требует права TEACHER, MODERATOR или ADMIN.'
  })
  @ApiParam({ name: 'id', description: 'ID тренировки', example: '507f1f77bcf86cd799439011' })
  @ApiParam({ name: 'tariffId', description: 'ID тарифа', example: '507f1f77bcf86cd799439012' })
  @ApiResponse({ status: 200, description: 'Тариф успешно убран из тренировки' })
  @ApiResponse({ status: 400, description: 'Невалидный ID тренировки или тарифа' })
  @ApiResponse({ status: 401, description: 'Пользователь не авторизован' })
  @ApiResponse({ status: 403, description: 'Недостаточно прав' })
  @ApiResponse({ status: 404, description: 'Тренировка не найдена' })
  removeTariff(@Param('id') id: string, @Param('tariffId') tariffId: string) {
    return this.workoutsService.removeTariff(id, tariffId);
  }
}
