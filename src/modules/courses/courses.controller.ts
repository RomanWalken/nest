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
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery, ApiParam } from '@nestjs/swagger';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole, CourseKind, CoursePublicationStatus } from '@/common/types';
import { PaginationDto } from '@/common/types';

@ApiTags('courses')
@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.MODERATOR, UserRole.ADMIN, UserRole.SUPERADMIN)
  @ApiBearerAuth()
  @ApiOperation({ 
    summary: 'Создать новый курс',
    description: 'Создает новый курс в системе. Доступно только модераторам, администраторам и супер-администраторам. Курс создается в рамках компании пользователя.'
  })
  @ApiResponse({ 
    status: 201, 
    description: 'Курс успешно создан',
    schema: {
      example: {
        _id: '507f1f77bcf86cd799439011',
        title: 'Основы фитнеса для начинающих',
        slug: 'osnovy-fitnesa-dlya-nachinayushchih',
        description: 'Комплексный курс по фитнесу...',
        kind: 'fitness',
        category: 'fitness_training',
        difficulty: 'beginner',
        publicationStatus: 'draft',
        isFeatured: false,
        companyId: '507f1f77bcf86cd799439012',
        authorId: '507f1f77bcf86cd799439013',
        createdAt: '2024-01-15T10:30:00.000Z',
        updatedAt: '2024-01-15T10:30:00.000Z'
      }
    }
  })
  @ApiResponse({ status: 400, description: 'Неверные данные или валидация не пройдена' })
  @ApiResponse({ status: 401, description: 'Пользователь не авторизован' })
  @ApiResponse({ status: 403, description: 'Недостаточно прав для создания курса' })
  @ApiResponse({ status: 409, description: 'Курс с таким slug уже существует в компании' })
  create(@Body() createCourseDto: CreateCourseDto, @Request() req) {
    return this.coursesService.create(createCourseDto, req.user.id, req.user.companyId);
  }

  @Get()
  @ApiOperation({ 
    summary: 'Получить список курсов',
    description: 'Возвращает список курсов с пагинацией. Для авторизованных пользователей показываются курсы их компании, для анонимных - только опубликованные курсы.'
  })
  @ApiQuery({ name: 'page', required: false, description: 'Номер страницы (по умолчанию 1)', example: 1 })
  @ApiQuery({ name: 'limit', required: false, description: 'Количество курсов на странице (по умолчанию 10)', example: 10 })
  @ApiQuery({ name: 'kind', required: false, description: 'Вид курса (regular или fitness)', enum: CourseKind, example: CourseKind.FITNESS })
  @ApiResponse({ 
    status: 200, 
    description: 'Список курсов получен',
    schema: {
      example: {
        data: [
          {
            _id: '507f1f77bcf86cd799439011',
            title: 'Основы фитнеса для начинающих',
            slug: 'osnovy-fitnesa-dlya-nachinayushchih',
            kind: 'fitness',
            category: 'fitness_training',
            difficulty: 'beginner',
            publicationStatus: 'published',
            isFeatured: false,
            authorId: {
              _id: '507f1f77bcf86cd799439013',
              firstName: 'Иван',
              lastName: 'Петров',
              email: 'ivan.petrov@example.com'
            },
            companyId: {
              _id: '507f1f77bcf86cd799439012',
              name: 'Fitness Academy Pro',
              slug: 'fitness-academy-pro'
            }
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
  findAll(@Query() paginationDto: PaginationDto, @Request() req, @Query('kind') kind?: CourseKind) {
    // Для публичного API показываем только опубликованные курсы
    // Для авторизованных пользователей показываем курсы их компании
    const companyId = req.user?.companyId;
    return this.coursesService.findAll(paginationDto, companyId, kind);
  }

  @Get('fitness')
  @ApiOperation({ 
    summary: 'Получить список фитнес-курсов',
    description: 'Возвращает только фитнес-курсы с meals, teachers и workouts. Для авторизованных пользователей показываются курсы их компании.'
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Список фитнес-курсов получен'
  })
  findFitnessCourses(@Request() req) {
    const companyId = req.user?.companyId;
    return this.coursesService.findFitnessCourses(companyId);
  }

  @Get('regular')
  @ApiOperation({ 
    summary: 'Получить список обычных курсов',
    description: 'Возвращает только обычные курсы (видео, кулинария и т.д.). Для авторизованных пользователей показываются курсы их компании.'
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Список обычных курсов получен'
  })
  findRegularCourses(@Request() req) {
    const companyId = req.user?.companyId;
    return this.coursesService.findRegularCourses(companyId);
  }

  @Get('category/:category')
  @ApiOperation({ 
    summary: 'Получить курсы по категории',
    description: 'Возвращает курсы определенной категории (видео, кулинария, фитнес-тренировки и т.д.).'
  })
  @ApiParam({ name: 'category', description: 'Категория курса', example: 'fitness_training' })
  @ApiResponse({ 
    status: 200, 
    description: 'Список курсов по категории получен'
  })
  findByCategory(@Param('category') category: string, @Request() req) {
    const companyId = req.user?.companyId;
    return this.coursesService.findByCategory(category, companyId);
  }

  @Get('published')
  @ApiOperation({ 
    summary: 'Получить список опубликованных курсов',
    description: 'Возвращает только опубликованные курсы. Для авторизованных пользователей показываются курсы их компании, для анонимных - все опубликованные курсы.'
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Список опубликованных курсов получен',
    schema: {
      example: [
        {
          _id: '507f1f77bcf86cd799439011',
          title: 'Основы фитнеса для начинающих',
          slug: 'osnovy-fitnesa-dlya-nachinayushchih',
          kind: 'fitness',
          category: 'fitness_training',
          difficulty: 'beginner',
          publicationStatus: 'published',
          isFeatured: false
        }
      ]
    }
  })
  findPublished(@Request() req) {
    const companyId = req.user?.companyId;
    return this.coursesService.findPublished(companyId);
  }

  @Get(':id')
  @ApiOperation({ 
    summary: 'Получить курс по ID',
    description: 'Возвращает полную информацию о курсе по его уникальному идентификатору. Включает данные об авторе и компании.'
  })
  @ApiParam({ name: 'id', description: 'Уникальный идентификатор курса', example: '507f1f77bcf86cd799439011' })
  @ApiResponse({ 
    status: 200, 
    description: 'Курс найден',
    schema: {
      example: {
        _id: '507f1f77bcf86cd799439011',
        title: 'Основы фитнеса для начинающих',
        slug: 'osnovy-fitnesa-dlya-nachinayushchih',
        description: 'Комплексный курс по фитнесу...',
        kind: 'fitness',
        category: 'fitness_training',
        difficulty: 'beginner',
        publicationStatus: 'published',
        isFeatured: false,
        authorId: {
          _id: '507f1f77bcf86cd799439013',
          firstName: 'Иван',
          lastName: 'Петров',
          email: 'ivan.petrov@example.com'
        },
        companyId: {
          _id: '507f1f77bcf86cd799439012',
          name: 'Fitness Academy Pro',
          slug: 'fitness-academy-pro'
        }
      }
    }
  })
  @ApiResponse({ status: 404, description: 'Курс не найден' })
  findOne(@Param('id') id: string) {
    return this.coursesService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.MODERATOR, UserRole.ADMIN, UserRole.SUPERADMIN)
  @ApiBearerAuth()
  @ApiOperation({ 
    summary: 'Обновить курс',
    description: 'Обновляет существующий курс. Доступно только модераторам, администраторам и супер-администраторам. Можно обновить любые поля курса.'
  })
  @ApiParam({ name: 'id', description: 'Уникальный идентификатор курса', example: '507f1f77bcf86cd799439011' })
  @ApiResponse({ 
    status: 200, 
    description: 'Курс успешно обновлен',
    schema: {
      example: {
        _id: '507f1f77bcf86cd799439011',
        title: 'Основы фитнеса для начинающих (обновлено)',
        slug: 'osnovy-fitnesa-dlya-nachinayushchih',
        description: 'Обновленное описание курса...',
        publicationStatus: 'published'
      }
    }
  })
  @ApiResponse({ status: 400, description: 'Неверные данные' })
  @ApiResponse({ status: 401, description: 'Пользователь не авторизован' })
  @ApiResponse({ status: 403, description: 'Недостаточно прав для обновления курса' })
  @ApiResponse({ status: 404, description: 'Курс не найден' })
  update(@Param('id') id: string, @Body() updateCourseDto: UpdateCourseDto) {
    return this.coursesService.update(id, updateCourseDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.SUPERADMIN)
  @ApiBearerAuth()
  @ApiOperation({ 
    summary: 'Удалить курс',
    description: 'Полностью удаляет курс из системы. Доступно только администраторам и супер-администраторам. Внимание: операция необратима!'
  })
  @ApiParam({ name: 'id', description: 'Уникальный идентификатор курса', example: '507f1f77bcf86cd799439011' })
  @ApiResponse({ 
    status: 200, 
    description: 'Курс успешно удален',
    schema: {
      example: {
        message: 'Курс успешно удален',
        deletedCourseId: '507f1f77bcf86cd799439011'
      }
    }
  })
  @ApiResponse({ status: 401, description: 'Пользователь не авторизован' })
  @ApiResponse({ status: 403, description: 'Недостаточно прав для удаления курса' })
  @ApiResponse({ status: 404, description: 'Курс не найден' })
  remove(@Param('id') id: string) {
    return this.coursesService.remove(id);
  }

  // Новые endpoints для управления фитнес-курсами

  @Post(':id/meals/:mealId')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.MODERATOR, UserRole.ADMIN, UserRole.SUPERADMIN)
  @ApiBearerAuth()
  @ApiOperation({ 
    summary: 'Добавить прием пищи к фитнес-курсу',
    description: 'Добавляет прием пищи к фитнес-курсу. Доступно только модераторам, администраторам и выше.'
  })
  @ApiParam({ name: 'id', description: 'ID курса', example: '507f1f77bcf86cd799439011' })
  @ApiParam({ name: 'mealId', description: 'ID приема пищи', example: '507f1f77bcf86cd799439014' })
  @ApiResponse({ status: 200, description: 'Прием пищи успешно добавлен к курсу' })
  @ApiResponse({ status: 400, description: 'Можно добавлять приемы пищи только к фитнес-курсам' })
  addMealToCourse(@Param('id') id: string, @Param('mealId') mealId: string) {
    return this.coursesService.addMealToCourse(id, mealId);
  }

  @Delete(':id/meals/:mealId')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.MODERATOR, UserRole.ADMIN, UserRole.SUPERADMIN)
  @ApiBearerAuth()
  @ApiOperation({ 
    summary: 'Убрать прием пищи у фитнес-курса',
    description: 'Убирает прием пищи у фитнес-курса. Доступно только модераторам, администраторам и выше.'
  })
  @ApiParam({ name: 'id', description: 'ID курса', example: '507f1f77bcf86cd799439011' })
  @ApiParam({ name: 'mealId', description: 'ID приема пищи', example: '507f1f77bcf86cd799439014' })
  @ApiResponse({ status: 200, description: 'Прием пищи успешно убран у курса' })
  removeMealFromCourse(@Param('id') id: string, @Param('mealId') mealId: string) {
    return this.coursesService.removeMealFromCourse(id, mealId);
  }

  @Post(':id/teachers/:teacherId')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.MODERATOR, UserRole.ADMIN, UserRole.SUPERADMIN)
  @ApiBearerAuth()
  @ApiOperation({ 
    summary: 'Добавить преподавателя к фитнес-курсу',
    description: 'Добавляет преподавателя к фитнес-курсу. Доступно только модераторам, администраторам и выше.'
  })
  @ApiParam({ name: 'id', description: 'ID курса', example: '507f1f77bcf86cd799439011' })
  @ApiParam({ name: 'teacherId', description: 'ID преподавателя', example: '507f1f77bcf86cd799439015' })
  @ApiResponse({ status: 200, description: 'Преподаватель успешно добавлен к курсу' })
  @ApiResponse({ status: 400, description: 'Можно добавлять преподавателей только к фитнес-курсам' })
  addTeacherToCourse(@Param('id') id: string, @Param('teacherId') teacherId: string) {
    return this.coursesService.addTeacherToCourse(id, teacherId);
  }

  @Delete(':id/teachers/:teacherId')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.MODERATOR, UserRole.ADMIN, UserRole.SUPERADMIN)
  @ApiBearerAuth()
  @ApiOperation({ 
    summary: 'Убрать преподавателя у фитнес-курса',
    description: 'Убирает преподавателя у фитнес-курса. Доступно только модераторам, администраторам и выше.'
  })
  @ApiParam({ name: 'id', description: 'ID курса', example: '507f1f77bcf86cd799439011' })
  @ApiParam({ name: 'teacherId', description: 'ID преподавателя', example: '507f1f77bcf86cd799439015' })
  @ApiResponse({ status: 200, description: 'Преподаватель успешно убран у курса' })
  removeTeacherFromCourse(@Param('id') id: string, @Param('teacherId') teacherId: string) {
    return this.coursesService.removeTeacherFromCourse(id, teacherId);
  }
} 