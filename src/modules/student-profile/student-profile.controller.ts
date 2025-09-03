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
import { StudentProfileService } from './student-profile.service';
import { CreateStudentProfileDto } from './dto/create-student-profile.dto';
import { UpdateStudentProfileDto } from './dto/update-student-profile.dto';
import { AddBodyMeasurementsDto } from './dto/add-body-measurements.dto';
import { PaginationDto } from '@/common/types';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '@/common/types';
import { Types } from 'mongoose';

@ApiTags('student-profile')
@Controller('student-profile')
export class StudentProfileController {
  constructor(private readonly studentProfileService: StudentProfileService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ 
    summary: 'Создать профиль студента',
    description: 'Создает профиль студента с целями фитнеса и начальными измерениями. Автоматически отмечает квиз как завершенный.'
  })
  @ApiResponse({ 
    status: 201, 
    description: 'Профиль студента успешно создан',
    schema: {
      example: {
        _id: '507f1f77bcf86cd799439011',
        userId: {
          _id: '507f1f77bcf86cd799439012',
          firstName: 'Иван',
          lastName: 'Петров',
          email: 'ivan@example.com'
        },
        fitnessGoals: {
          primaryGoal: 'weight_loss',
          targetWeight: 65,
          activityLevel: 'moderate',
          experienceLevel: 'beginner'
        },
        hasCompletedInitialQuiz: true,
        quizCompletedAt: '2024-01-15T10:30:00.000Z',
        createdAt: '2024-01-15T10:30:00.000Z'
      }
    }
  })
  @ApiResponse({ status: 400, description: 'Неверные данные или профиль уже существует' })
  @ApiResponse({ status: 401, description: 'Пользователь не авторизован' })
  create(@Body() createStudentProfileDto: CreateStudentProfileDto, @Request() req) {
    // Автоматически устанавливаем userId из JWT токена
    createStudentProfileDto.userId = req.user.id;
    return this.studentProfileService.create(createStudentProfileDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.TEACHER, UserRole.MODERATOR, UserRole.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ 
    summary: 'Получить список профилей студентов',
    description: 'Возвращает список профилей студентов с пагинацией и фильтрацией. Требует права TEACHER, MODERATOR или ADMIN.'
  })
  @ApiQuery({ name: 'page', required: false, description: 'Номер страницы (по умолчанию 1)', example: 1 })
  @ApiQuery({ name: 'limit', required: false, description: 'Количество записей на странице (по умолчанию 10)', example: 10 })
  @ApiQuery({ name: 'hasCompletedQuiz', required: false, description: 'Фильтр по завершенному квизу', example: true })
  @ApiQuery({ name: 'experienceLevel', required: false, description: 'Фильтр по уровню опыта', example: 'beginner' })
  @ApiQuery({ name: 'primaryGoal', required: false, description: 'Фильтр по основной цели', example: 'weight_loss' })
  @ApiResponse({ 
    status: 200, 
    description: 'Список профилей получен',
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
            fitnessGoals: {
              primaryGoal: 'weight_loss',
              experienceLevel: 'beginner'
            },
            hasCompletedInitialQuiz: true
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
    @Query('hasCompletedQuiz') hasCompletedQuiz?: boolean,
    @Query('experienceLevel') experienceLevel?: string,
    @Query('primaryGoal') primaryGoal?: string,
  ) {
    return this.studentProfileService.findAll(paginationDto, hasCompletedQuiz, experienceLevel, primaryGoal);
  }

  @Get('my-profile')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ 
    summary: 'Получить мой профиль',
    description: 'Возвращает профиль текущего пользователя.'
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Профиль пользователя получен',
    schema: {
      example: {
        _id: '507f1f77bcf86cd799439011',
        userId: '507f1f77bcf86cd799439012',
        fitnessGoals: {
          primaryGoal: 'weight_loss',
          targetWeight: 65,
          activityLevel: 'moderate',
          experienceLevel: 'beginner'
        },
        currentMeasurements: {
          weight: 70,
          height: 175,
          bodyFat: 20
        },
        hasCompletedInitialQuiz: true
      }
    }
  })
  @ApiResponse({ status: 401, description: 'Пользователь не авторизован' })
  @ApiResponse({ status: 404, description: 'Профиль не найден' })
  getMyProfile(@Request() req) {
    return this.studentProfileService.findByUserId(req.user.id);
  }

  @Get('by-goal/:goal')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.TEACHER, UserRole.MODERATOR, UserRole.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ 
    summary: 'Получить студентов по цели',
    description: 'Возвращает список студентов с определенной основной целью. Требует права TEACHER, MODERATOR или ADMIN.'
  })
  @ApiParam({ name: 'goal', description: 'Основная цель', example: 'weight_loss' })
  @ApiResponse({ status: 200, description: 'Список студентов по цели получен' })
  @ApiResponse({ status: 401, description: 'Пользователь не авторизован' })
  @ApiResponse({ status: 403, description: 'Недостаточно прав' })
  getStudentsByGoal(@Param('goal') goal: string) {
    return this.studentProfileService.getStudentsByGoal(goal);
  }

  @Get('by-experience/:level')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.TEACHER, UserRole.MODERATOR, UserRole.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ 
    summary: 'Получить студентов по уровню опыта',
    description: 'Возвращает список студентов с определенным уровнем опыта. Требует права TEACHER, MODERATOR или ADMIN.'
  })
  @ApiParam({ name: 'level', description: 'Уровень опыта', example: 'beginner' })
  @ApiResponse({ status: 200, description: 'Список студентов по уровню опыта получен' })
  @ApiResponse({ status: 401, description: 'Пользователь не авторизован' })
  @ApiResponse({ status: 403, description: 'Недостаточно прав' })
  getStudentsByExperienceLevel(@Param('level') level: string) {
    return this.studentProfileService.getStudentsByExperienceLevel(level);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.TEACHER, UserRole.MODERATOR, UserRole.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ 
    summary: 'Получить профиль по ID',
    description: 'Возвращает детальную информацию о профиле студента. Требует права TEACHER, MODERATOR или ADMIN.'
  })
  @ApiParam({ name: 'id', description: 'ID профиля (24-символьная hex строка)', example: '507f1f77bcf86cd799439011' })
  @ApiResponse({ status: 200, description: 'Профиль найден' })
  @ApiResponse({ status: 400, description: 'Невалидный ID профиля' })
  @ApiResponse({ status: 401, description: 'Пользователь не авторизован' })
  @ApiResponse({ status: 403, description: 'Недостаточно прав' })
  @ApiResponse({ status: 404, description: 'Профиль не найден' })
  findOne(@Param('id') id: string) {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException(`Невалидный ID профиля: ${id}`);
    }
    return this.studentProfileService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.TEACHER, UserRole.MODERATOR, UserRole.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ 
    summary: 'Обновить профиль студента',
    description: 'Обновляет профиль студента. Требует права TEACHER, MODERATOR или ADMIN.'
  })
  @ApiParam({ name: 'id', description: 'ID профиля (24-символьная hex строка)', example: '507f1f77bcf86cd799439011' })
  @ApiResponse({ status: 200, description: 'Профиль успешно обновлен' })
  @ApiResponse({ status: 400, description: 'Невалидный ID профиля' })
  @ApiResponse({ status: 401, description: 'Пользователь не авторизован' })
  @ApiResponse({ status: 403, description: 'Недостаточно прав для обновления профиля' })
  @ApiResponse({ status: 404, description: 'Профиль не найден' })
  update(@Param('id') id: string, @Body() updateStudentProfileDto: UpdateStudentProfileDto, @Request() req) {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException(`Невалидный ID профиля: ${id}`);
    }
    // Добавляем информацию о том, кто обновил профиль
    updateStudentProfileDto.metadata = {
      ...updateStudentProfileDto.metadata,
      updatedBy: req.user.id
    };
    return this.studentProfileService.update(id, updateStudentProfileDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.MODERATOR, UserRole.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ 
    summary: 'Удалить профиль студента',
    description: 'Удаляет профиль студента. Требует права MODERATOR или ADMIN.'
  })
  @ApiParam({ name: 'id', description: 'ID профиля (24-символьная hex строка)', example: '507f1f77bcf86cd799439011' })
  @ApiResponse({ status: 200, description: 'Профиль успешно удален' })
  @ApiResponse({ status: 400, description: 'Невалидный ID профиля' })
  @ApiResponse({ status: 401, description: 'Пользователь не авторизован' })
  @ApiResponse({ status: 403, description: 'Недостаточно прав для удаления профиля' })
  @ApiResponse({ status: 404, description: 'Профиль не найден' })
  remove(@Param('id') id: string) {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException(`Невалидный ID профиля: ${id}`);
    }
    return this.studentProfileService.remove(id);
  }

  // Методы для работы с измерениями тела
  @Post(':id/measurements')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ 
    summary: 'Добавить измерения тела',
    description: 'Добавляет новые измерения тела к профилю студента.'
  })
  @ApiParam({ name: 'id', description: 'ID профиля', example: '507f1f77bcf86cd799439011' })
  @ApiResponse({ status: 200, description: 'Измерения успешно добавлены' })
  @ApiResponse({ status: 400, description: 'Невалидный ID профиля' })
  @ApiResponse({ status: 401, description: 'Пользователь не авторизован' })
  @ApiResponse({ status: 404, description: 'Профиль не найден' })
  addBodyMeasurements(@Param('id') id: string, @Body() measurementsDto: AddBodyMeasurementsDto, @Request() req) {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException(`Невалидный ID профиля: ${id}`);
    }
    // Добавляем информацию о том, кто добавил измерения
    measurementsDto.metadata = {
      ...measurementsDto.metadata,
      updatedBy: req.user.id
    };
    return this.studentProfileService.addBodyMeasurements(id, measurementsDto);
  }

  @Get(':id/measurements/history')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ 
    summary: 'Получить историю измерений',
    description: 'Возвращает историю всех измерений тела студента.'
  })
  @ApiParam({ name: 'id', description: 'ID профиля', example: '507f1f77bcf86cd799439011' })
  @ApiResponse({ status: 200, description: 'История измерений получена' })
  @ApiResponse({ status: 400, description: 'Невалидный ID профиля' })
  @ApiResponse({ status: 401, description: 'Пользователь не авторизован' })
  @ApiResponse({ status: 404, description: 'Профиль не найден' })
  getBodyMeasurementsHistory(@Param('id') id: string) {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException(`Невалидный ID профиля: ${id}`);
    }
    return this.studentProfileService.getBodyMeasurementsHistory(id);
  }

  @Get(':id/progress')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ 
    summary: 'Получить статистику прогресса',
    description: 'Возвращает детальную статистику прогресса студента на основе измерений.'
  })
  @ApiParam({ name: 'id', description: 'ID профиля', example: '507f1f77bcf86cd799439011' })
  @ApiResponse({ 
    status: 200, 
    description: 'Статистика прогресса получена',
    schema: {
      example: {
        hasProgress: true,
        period: {
          start: '2024-01-01T00:00:00.000Z',
          end: '2024-01-15T00:00:00.000Z',
          days: 14
        },
        weight: {
          start: 75,
          current: 72,
          change: -3,
          changePercent: '-4.00'
        },
        bodyFat: {
          start: 20,
          current: 18,
          change: -2,
          changePercent: '-10.00'
        }
      }
    }
  })
  @ApiResponse({ status: 400, description: 'Невалидный ID профиля' })
  @ApiResponse({ status: 401, description: 'Пользователь не авторизован' })
  @ApiResponse({ status: 404, description: 'Профиль не найден' })
  getProgressStats(@Param('id') id: string) {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException(`Невалидный ID профиля: ${id}`);
    }
    return this.studentProfileService.getProgressStats(id);
  }

  // Методы для работы с целями фитнеса
  @Patch(':id/fitness-goals')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ 
    summary: 'Обновить цели фитнеса',
    description: 'Обновляет цели фитнеса студента.'
  })
  @ApiParam({ name: 'id', description: 'ID профиля', example: '507f1f77bcf86cd799439011' })
  @ApiResponse({ status: 200, description: 'Цели фитнеса успешно обновлены' })
  @ApiResponse({ status: 400, description: 'Невалидный ID профиля' })
  @ApiResponse({ status: 401, description: 'Пользователь не авторизован' })
  @ApiResponse({ status: 404, description: 'Профиль не найден' })
  updateFitnessGoals(@Param('id') id: string, @Body() goalsUpdate: any) {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException(`Невалидный ID профиля: ${id}`);
    }
    return this.studentProfileService.updateFitnessGoals(id, goalsUpdate);
  }

  @Post(':id/complete-quiz')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ 
    summary: 'Отметить квиз как завершенный',
    description: 'Отмечает начальный квиз как завершенный.'
  })
  @ApiParam({ name: 'id', description: 'ID профиля', example: '507f1f77bcf86cd799439011' })
  @ApiResponse({ status: 200, description: 'Квиз отмечен как завершенный' })
  @ApiResponse({ status: 400, description: 'Невалидный ID профиля' })
  @ApiResponse({ status: 401, description: 'Пользователь не авторизован' })
  @ApiResponse({ status: 404, description: 'Профиль не найден' })
  markQuizCompleted(@Param('id') id: string) {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException(`Невалидный ID профиля: ${id}`);
    }
    return this.studentProfileService.markQuizCompleted(id);
  }

  // Методы для работы с достижениями
  @Post(':id/achievements')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.TEACHER, UserRole.MODERATOR, UserRole.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ 
    summary: 'Добавить достижение',
    description: 'Добавляет достижение студенту. Требует права TEACHER, MODERATOR или ADMIN.'
  })
  @ApiParam({ name: 'id', description: 'ID профиля', example: '507f1f77bcf86cd799439011' })
  @ApiResponse({ status: 200, description: 'Достижение успешно добавлено' })
  @ApiResponse({ status: 400, description: 'Невалидный ID профиля' })
  @ApiResponse({ status: 401, description: 'Пользователь не авторизован' })
  @ApiResponse({ status: 403, description: 'Недостаточно прав' })
  @ApiResponse({ status: 404, description: 'Профиль не найден' })
  addAchievement(@Param('id') id: string, @Body() body: { achievement: string }) {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException(`Невалидный ID профиля: ${id}`);
    }
    return this.studentProfileService.addAchievement(id, body.achievement);
  }

  // Методы для работы с курсами
  @Post(':id/enroll/:courseId')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.TEACHER, UserRole.MODERATOR, UserRole.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ 
    summary: 'Записать студента на фитнес-курс',
    description: 'Записывает студента на фитнес-курс. Требует права TEACHER, MODERATOR или ADMIN.'
  })
  @ApiParam({ name: 'id', description: 'ID профиля', example: '507f1f77bcf86cd799439011' })
  @ApiParam({ name: 'courseId', description: 'ID курса', example: '507f1f77bcf86cd799439012' })
  @ApiResponse({ status: 200, description: 'Студент успешно записан на курс' })
  @ApiResponse({ status: 400, description: 'Невалидный ID профиля или курса' })
  @ApiResponse({ status: 401, description: 'Пользователь не авторизован' })
  @ApiResponse({ status: 403, description: 'Недостаточно прав' })
  @ApiResponse({ status: 404, description: 'Профиль не найден' })
  enrollInFitnessCourse(@Param('id') id: string, @Param('courseId') courseId: string) {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException(`Невалидный ID профиля: ${id}`);
    }
    if (!Types.ObjectId.isValid(courseId)) {
      throw new BadRequestException(`Невалидный ID курса: ${courseId}`);
    }
    return this.studentProfileService.enrollInFitnessCourse(id, courseId);
  }

  @Delete(':id/enroll/:courseId')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.TEACHER, UserRole.MODERATOR, UserRole.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ 
    summary: 'Отписать студента от фитнес-курса',
    description: 'Отписывает студента от фитнес-курса. Требует права TEACHER, MODERATOR или ADMIN.'
  })
  @ApiParam({ name: 'id', description: 'ID профиля', example: '507f1f77bcf86cd799439011' })
  @ApiParam({ name: 'courseId', description: 'ID курса', example: '507f1f77bcf86cd799439012' })
  @ApiResponse({ status: 200, description: 'Студент успешно отписан от курса' })
  @ApiResponse({ status: 400, description: 'Невалидный ID профиля или курса' })
  @ApiResponse({ status: 401, description: 'Пользователь не авторизован' })
  @ApiResponse({ status: 403, description: 'Недостаточно прав' })
  @ApiResponse({ status: 404, description: 'Профиль не найден' })
  unenrollFromFitnessCourse(@Param('id') id: string, @Param('courseId') courseId: string) {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException(`Невалидный ID профиля: ${id}`);
    }
    if (!Types.ObjectId.isValid(courseId)) {
      throw new BadRequestException(`Невалидный ID курса: ${courseId}`);
    }
    return this.studentProfileService.unenrollFromFitnessCourse(id, courseId);
  }
}
