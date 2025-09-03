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
import { UserCourseSettingsService } from './user-course-settings.service';
import { CreateUserCourseSettingsDto } from './dto/create-user-course-settings.dto';
import { UpdateUserCourseSettingsDto } from './dto/update-user-course-settings.dto';
import { PaginationDto } from '@/common/types';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '@/common/types';
import { Types } from 'mongoose';

@ApiTags('user-course-settings')
@Controller('user-course-settings')
export class UserCourseSettingsController {
  constructor(private readonly userCourseSettingsService: UserCourseSettingsService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.TEACHER, UserRole.MODERATOR, UserRole.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ 
    summary: 'Создать персональные настройки курса для студента',
    description: 'Создает индивидуальные настройки курса для конкретного студента. Требует права TEACHER, MODERATOR или ADMIN.'
  })
  @ApiResponse({ 
    status: 201, 
    description: 'Настройки успешно созданы',
    schema: {
      example: {
        _id: '507f1f77bcf86cd799439011',
        userId: {
          _id: '507f1f77bcf86cd799439012',
          firstName: 'Иван',
          lastName: 'Петров',
          email: 'ivan@example.com'
        },
        courseId: {
          _id: '507f1f77bcf86cd799439013',
          title: 'Основы фитнеса',
          slug: 'osnovy-fitnesa',
          kind: 'fitness'
        },
        isActive: true,
        workoutOverrides: [],
        exerciseOverrides: [],
        lessonOverrides: [],
        courseSettings: {
          difficulty: 'beginner',
          pace: 'normal',
          notifications: true,
          reminders: true
        },
        createdAt: '2024-01-15T10:30:00.000Z',
        updatedAt: '2024-01-15T10:30:00.000Z'
      }
    }
  })
  @ApiResponse({ status: 400, description: 'Неверные данные или настройки уже существуют' })
  @ApiResponse({ status: 401, description: 'Пользователь не авторизован' })
  @ApiResponse({ status: 403, description: 'Недостаточно прав для создания настроек' })
  create(@Body() createUserCourseSettingsDto: CreateUserCourseSettingsDto, @Request() req) {
    // Автоматически устанавливаем createdBy из JWT токена
    createUserCourseSettingsDto.createdBy = req.user.id;
    return this.userCourseSettingsService.create(createUserCourseSettingsDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.TEACHER, UserRole.MODERATOR, UserRole.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ 
    summary: 'Получить список персональных настроек',
    description: 'Возвращает список персональных настроек курсов с пагинацией и фильтрацией. Требует права TEACHER, MODERATOR или ADMIN.'
  })
  @ApiQuery({ name: 'page', required: false, description: 'Номер страницы (по умолчанию 1)', example: 1 })
  @ApiQuery({ name: 'limit', required: false, description: 'Количество записей на странице (по умолчанию 10)', example: 10 })
  @ApiQuery({ name: 'courseId', required: false, description: 'ID курса для фильтрации', example: '507f1f77bcf86cd799439011' })
  @ApiQuery({ name: 'userId', required: false, description: 'ID пользователя для фильтрации', example: '507f1f77bcf86cd799439012' })
  @ApiQuery({ name: 'isActive', required: false, description: 'Фильтр по активным настройкам', example: true })
  @ApiResponse({ 
    status: 200, 
    description: 'Список настроек получен',
    schema: {
      example: {
        data: [
          {
            _id: '507f1f77bcf86cd799439011',
            userId: {
              _id: '507f1f77bcf86cd799439012',
              firstName: 'Иван',
              lastName: 'Петров',
              email: 'ivan@example.com'
            },
            courseId: {
              _id: '507f1f77bcf86cd799439013',
              title: 'Основы фитнеса',
              slug: 'osnovy-fitnesa'
            },
            isActive: true,
            lastModified: '2024-01-15T10:30:00.000Z'
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
    @Query('userId') userId?: string,
    @Query('isActive') isActive?: boolean,
  ) {
    return this.userCourseSettingsService.findAll(paginationDto, courseId, userId, isActive);
  }

  @Get('my-settings/:courseId')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ 
    summary: 'Получить мои настройки для курса',
    description: 'Возвращает персональные настройки текущего пользователя для указанного курса.'
  })
  @ApiParam({ name: 'courseId', description: 'ID курса', example: '507f1f77bcf86cd799439011' })
  @ApiResponse({ 
    status: 200, 
    description: 'Настройки пользователя получены',
    schema: {
      example: {
        hasPersonalSettings: true,
        settings: {
          _id: '507f1f77bcf86cd799439011',
          userId: '507f1f77bcf86cd799439012',
          courseId: '507f1f77bcf86cd799439013',
          isActive: true,
          workoutOverrides: [],
          exerciseOverrides: [],
          lessonOverrides: [],
          courseSettings: {
            difficulty: 'beginner',
            pace: 'normal'
          }
        }
      }
    }
  })
  @ApiResponse({ status: 400, description: 'Невалидный ID курса' })
  @ApiResponse({ status: 401, description: 'Пользователь не авторизован' })
  getMySettings(@Param('courseId') courseId: string, @Request() req) {
    if (!Types.ObjectId.isValid(courseId)) {
      throw new BadRequestException(`Невалидный ID курса: ${courseId}`);
    }
    return this.userCourseSettingsService.getMergedSettings(req.user.id, courseId);
  }

  @Get('course/:courseId')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.TEACHER, UserRole.MODERATOR, UserRole.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ 
    summary: 'Получить настройки всех студентов курса',
    description: 'Возвращает персональные настройки всех студентов для указанного курса. Требует права TEACHER, MODERATOR или ADMIN.'
  })
  @ApiParam({ name: 'courseId', description: 'ID курса', example: '507f1f77bcf86cd799439011' })
  @ApiResponse({ status: 200, description: 'Список настроек студентов курса получен' })
  @ApiResponse({ status: 400, description: 'Невалидный ID курса' })
  @ApiResponse({ status: 401, description: 'Пользователь не авторизован' })
  @ApiResponse({ status: 403, description: 'Недостаточно прав' })
  findByCourse(@Param('courseId') courseId: string) {
    if (!Types.ObjectId.isValid(courseId)) {
      throw new BadRequestException(`Невалидный ID курса: ${courseId}`);
    }
    return this.userCourseSettingsService.findByCourse(courseId);
  }

  @Get('user/:userId')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.TEACHER, UserRole.MODERATOR, UserRole.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ 
    summary: 'Получить настройки студента по всем курсам',
    description: 'Возвращает персональные настройки указанного студента по всем курсам. Требует права TEACHER, MODERATOR или ADMIN.'
  })
  @ApiParam({ name: 'userId', description: 'ID пользователя', example: '507f1f77bcf86cd799439011' })
  @ApiResponse({ status: 200, description: 'Список настроек студента получен' })
  @ApiResponse({ status: 400, description: 'Невалидный ID пользователя' })
  @ApiResponse({ status: 401, description: 'Пользователь не авторизован' })
  @ApiResponse({ status: 403, description: 'Недостаточно прав' })
  findByUser(@Param('userId') userId: string) {
    if (!Types.ObjectId.isValid(userId)) {
      throw new BadRequestException(`Невалидный ID пользователя: ${userId}`);
    }
    return this.userCourseSettingsService.findByUser(userId);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.TEACHER, UserRole.MODERATOR, UserRole.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ 
    summary: 'Получить настройки по ID',
    description: 'Возвращает детальную информацию о персональных настройках. Требует права TEACHER, MODERATOR или ADMIN.'
  })
  @ApiParam({ name: 'id', description: 'ID настроек (24-символьная hex строка)', example: '507f1f77bcf86cd799439011' })
  @ApiResponse({ status: 200, description: 'Настройки найдены' })
  @ApiResponse({ status: 400, description: 'Невалидный ID настроек' })
  @ApiResponse({ status: 401, description: 'Пользователь не авторизован' })
  @ApiResponse({ status: 403, description: 'Недостаточно прав' })
  @ApiResponse({ status: 404, description: 'Настройки не найдены' })
  findOne(@Param('id') id: string) {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException(`Невалидный ID настроек: ${id}`);
    }
    return this.userCourseSettingsService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.TEACHER, UserRole.MODERATOR, UserRole.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ 
    summary: 'Обновить персональные настройки',
    description: 'Обновляет персональные настройки курса для студента. Требует права TEACHER, MODERATOR или ADMIN.'
  })
  @ApiParam({ name: 'id', description: 'ID настроек (24-символьная hex строка)', example: '507f1f77bcf86cd799439011' })
  @ApiResponse({ status: 200, description: 'Настройки успешно обновлены' })
  @ApiResponse({ status: 400, description: 'Невалидный ID настроек' })
  @ApiResponse({ status: 401, description: 'Пользователь не авторизован' })
  @ApiResponse({ status: 403, description: 'Недостаточно прав для обновления настроек' })
  @ApiResponse({ status: 404, description: 'Настройки не найдены' })
  update(@Param('id') id: string, @Body() updateUserCourseSettingsDto: UpdateUserCourseSettingsDto) {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException(`Невалидный ID настроек: ${id}`);
    }
    return this.userCourseSettingsService.update(id, updateUserCourseSettingsDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.TEACHER, UserRole.MODERATOR, UserRole.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ 
    summary: 'Удалить персональные настройки',
    description: 'Удаляет персональные настройки курса для студента. Требует права TEACHER, MODERATOR или ADMIN.'
  })
  @ApiParam({ name: 'id', description: 'ID настроек (24-символьная hex строка)', example: '507f1f77bcf86cd799439011' })
  @ApiResponse({ status: 200, description: 'Настройки успешно удалены' })
  @ApiResponse({ status: 400, description: 'Невалидный ID настроек' })
  @ApiResponse({ status: 401, description: 'Пользователь не авторизован' })
  @ApiResponse({ status: 403, description: 'Недостаточно прав для удаления настроек' })
  @ApiResponse({ status: 404, description: 'Настройки не найдены' })
  remove(@Param('id') id: string) {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException(`Невалидный ID настроек: ${id}`);
    }
    return this.userCourseSettingsService.remove(id);
  }

  // Методы для работы с переопределениями тренировок
  @Post(':id/workout-overrides')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.TEACHER, UserRole.MODERATOR, UserRole.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ 
    summary: 'Добавить переопределение тренировки',
    description: 'Добавляет персональное переопределение для тренировки. Требует права TEACHER, MODERATOR или ADMIN.'
  })
  @ApiParam({ name: 'id', description: 'ID настроек', example: '507f1f77bcf86cd799439011' })
  @ApiResponse({ status: 200, description: 'Переопределение тренировки успешно добавлено' })
  @ApiResponse({ status: 400, description: 'Невалидный ID настроек' })
  @ApiResponse({ status: 401, description: 'Пользователь не авторизован' })
  @ApiResponse({ status: 403, description: 'Недостаточно прав' })
  @ApiResponse({ status: 404, description: 'Настройки не найдены' })
  addWorkoutOverride(@Param('id') id: string, @Body() workoutOverride: any) {
    return this.userCourseSettingsService.addWorkoutOverride(id, workoutOverride);
  }

  @Patch(':id/workout-overrides/:workoutId')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.TEACHER, UserRole.MODERATOR, UserRole.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ 
    summary: 'Обновить переопределение тренировки',
    description: 'Обновляет персональное переопределение для тренировки. Требует права TEACHER, MODERATOR или ADMIN.'
  })
  @ApiParam({ name: 'id', description: 'ID настроек', example: '507f1f77bcf86cd799439011' })
  @ApiParam({ name: 'workoutId', description: 'ID тренировки', example: '507f1f77bcf86cd799439012' })
  @ApiResponse({ status: 200, description: 'Переопределение тренировки успешно обновлено' })
  @ApiResponse({ status: 400, description: 'Невалидный ID настроек или тренировки' })
  @ApiResponse({ status: 401, description: 'Пользователь не авторизован' })
  @ApiResponse({ status: 403, description: 'Недостаточно прав' })
  @ApiResponse({ status: 404, description: 'Настройки или переопределение не найдены' })
  updateWorkoutOverride(@Param('id') id: string, @Param('workoutId') workoutId: string, @Body() updateData: any) {
    return this.userCourseSettingsService.updateWorkoutOverride(id, workoutId, updateData);
  }

  @Delete(':id/workout-overrides/:workoutId')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.TEACHER, UserRole.MODERATOR, UserRole.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ 
    summary: 'Удалить переопределение тренировки',
    description: 'Удаляет персональное переопределение для тренировки. Требует права TEACHER, MODERATOR или ADMIN.'
  })
  @ApiParam({ name: 'id', description: 'ID настроек', example: '507f1f77bcf86cd799439011' })
  @ApiParam({ name: 'workoutId', description: 'ID тренировки', example: '507f1f77bcf86cd799439012' })
  @ApiResponse({ status: 200, description: 'Переопределение тренировки успешно удалено' })
  @ApiResponse({ status: 400, description: 'Невалидный ID настроек или тренировки' })
  @ApiResponse({ status: 401, description: 'Пользователь не авторизован' })
  @ApiResponse({ status: 403, description: 'Недостаточно прав' })
  @ApiResponse({ status: 404, description: 'Настройки не найдены' })
  removeWorkoutOverride(@Param('id') id: string, @Param('workoutId') workoutId: string) {
    return this.userCourseSettingsService.removeWorkoutOverride(id, workoutId);
  }

  // Методы для работы с переопределениями упражнений
  @Post(':id/exercise-overrides')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.TEACHER, UserRole.MODERATOR, UserRole.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ 
    summary: 'Добавить переопределение упражнения',
    description: 'Добавляет персональное переопределение для упражнения. Требует права TEACHER, MODERATOR или ADMIN.'
  })
  @ApiParam({ name: 'id', description: 'ID настроек', example: '507f1f77bcf86cd799439011' })
  @ApiResponse({ status: 200, description: 'Переопределение упражнения успешно добавлено' })
  @ApiResponse({ status: 400, description: 'Невалидный ID настроек' })
  @ApiResponse({ status: 401, description: 'Пользователь не авторизован' })
  @ApiResponse({ status: 403, description: 'Недостаточно прав' })
  @ApiResponse({ status: 404, description: 'Настройки не найдены' })
  addExerciseOverride(@Param('id') id: string, @Body() exerciseOverride: any) {
    return this.userCourseSettingsService.addExerciseOverride(id, exerciseOverride);
  }

  @Patch(':id/exercise-overrides/:exerciseId')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.TEACHER, UserRole.MODERATOR, UserRole.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ 
    summary: 'Обновить переопределение упражнения',
    description: 'Обновляет персональное переопределение для упражнения. Требует права TEACHER, MODERATOR или ADMIN.'
  })
  @ApiParam({ name: 'id', description: 'ID настроек', example: '507f1f77bcf86cd799439011' })
  @ApiParam({ name: 'exerciseId', description: 'ID упражнения', example: '507f1f77bcf86cd799439012' })
  @ApiResponse({ status: 200, description: 'Переопределение упражнения успешно обновлено' })
  @ApiResponse({ status: 400, description: 'Невалидный ID настроек или упражнения' })
  @ApiResponse({ status: 401, description: 'Пользователь не авторизован' })
  @ApiResponse({ status: 403, description: 'Недостаточно прав' })
  @ApiResponse({ status: 404, description: 'Настройки или переопределение не найдены' })
  updateExerciseOverride(@Param('id') id: string, @Param('exerciseId') exerciseId: string, @Body() updateData: any) {
    return this.userCourseSettingsService.updateExerciseOverride(id, exerciseId, updateData);
  }

  @Delete(':id/exercise-overrides/:exerciseId')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBearerAuth()
  @Roles(UserRole.TEACHER, UserRole.MODERATOR, UserRole.ADMIN)
  @ApiOperation({ 
    summary: 'Удалить переопределение упражнения',
    description: 'Удаляет персональное переопределение для упражнения. Требует права TEACHER, MODERATOR или ADMIN.'
  })
  @ApiParam({ name: 'id', description: 'ID настроек', example: '507f1f77bcf86cd799439011' })
  @ApiParam({ name: 'exerciseId', description: 'ID упражнения', example: '507f1f77bcf86cd799439012' })
  @ApiResponse({ status: 200, description: 'Переопределение упражнения успешно удалено' })
  @ApiResponse({ status: 400, description: 'Невалидный ID настроек или упражнения' })
  @ApiResponse({ status: 401, description: 'Пользователь не авторизован' })
  @ApiResponse({ status: 403, description: 'Недостаточно прав' })
  @ApiResponse({ status: 404, description: 'Настройки не найдены' })
  removeExerciseOverride(@Param('id') id: string, @Param('exerciseId') exerciseId: string) {
    return this.userCourseSettingsService.removeExerciseOverride(id, exerciseId);
  }

  // Методы для работы с переопределениями уроков
  @Post(':id/lesson-overrides')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.TEACHER, UserRole.MODERATOR, UserRole.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ 
    summary: 'Добавить переопределение урока',
    description: 'Добавляет персональное переопределение для урока. Требует права TEACHER, MODERATOR или ADMIN.'
  })
  @ApiParam({ name: 'id', description: 'ID настроек', example: '507f1f77bcf86cd799439011' })
  @ApiResponse({ status: 200, description: 'Переопределение урока успешно добавлено' })
  @ApiResponse({ status: 400, description: 'Невалидный ID настроек' })
  @ApiResponse({ status: 401, description: 'Пользователь не авторизован' })
  @ApiResponse({ status: 403, description: 'Недостаточно прав' })
  @ApiResponse({ status: 404, description: 'Настройки не найдены' })
  addLessonOverride(@Param('id') id: string, @Body() lessonOverride: any) {
    return this.userCourseSettingsService.addLessonOverride(id, lessonOverride);
  }

  @Patch(':id/lesson-overrides/:lessonId')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.TEACHER, UserRole.MODERATOR, UserRole.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ 
    summary: 'Обновить переопределение урока',
    description: 'Обновляет персональное переопределение для урока. Требует права TEACHER, MODERATOR или ADMIN.'
  })
  @ApiParam({ name: 'id', description: 'ID настроек', example: '507f1f77bcf86cd799439011' })
  @ApiParam({ name: 'lessonId', description: 'ID урока', example: '507f1f77bcf86cd799439012' })
  @ApiResponse({ status: 200, description: 'Переопределение урока успешно обновлено' })
  @ApiResponse({ status: 400, description: 'Невалидный ID настроек или урока' })
  @ApiResponse({ status: 401, description: 'Пользователь не авторизован' })
  @ApiResponse({ status: 403, description: 'Недостаточно прав' })
  @ApiResponse({ status: 404, description: 'Настройки или переопределение не найдены' })
  updateLessonOverride(@Param('id') id: string, @Param('lessonId') lessonId: string, @Body() updateData: any) {
    return this.userCourseSettingsService.updateLessonOverride(id, lessonId, updateData);
  }

  @Delete(':id/lesson-overrides/:lessonId')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.TEACHER, UserRole.MODERATOR, UserRole.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ 
    summary: 'Удалить переопределение урока',
    description: 'Удаляет персональное переопределение для урока. Требует права TEACHER, MODERATOR или ADMIN.'
  })
  @ApiParam({ name: 'id', description: 'ID настроек', example: '507f1f77bcf86cd799439011' })
  @ApiParam({ name: 'lessonId', description: 'ID урока', example: '507f1f77bcf86cd799439012' })
  @ApiResponse({ status: 200, description: 'Переопределение урока успешно удалено' })
  @ApiResponse({ status: 400, description: 'Невалидный ID настроек или урока' })
  @ApiResponse({ status: 401, description: 'Пользователь не авторизован' })
  @ApiResponse({ status: 403, description: 'Недостаточно прав' })
  @ApiResponse({ status: 404, description: 'Настройки не найдены' })
  removeLessonOverride(@Param('id') id: string, @Param('lessonId') lessonId: string) {
    return this.userCourseSettingsService.removeLessonOverride(id, lessonId);
  }
}
