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
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam, ApiQuery } from '@nestjs/swagger';
import { TeachersService } from './teachers.service';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { QueryTeacherDto } from './dto/query-teacher.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '@/common/types';

@ApiTags('Преподаватели')
@Controller('teachers')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
export class TeachersController {
  constructor(private readonly teachersService: TeachersService) {}

  @Post()
  @Roles(UserRole.ADMIN, UserRole.SUPERADMIN)
  @ApiOperation({ 
    summary: 'Создать нового преподавателя',
    description: 'Создает нового преподавателя в системе. Доступно только администраторам и выше.'
  })
  @ApiResponse({ 
    status: HttpStatus.CREATED, 
    description: 'Преподаватель успешно создан',
    schema: {
      example: {
        _id: '507f1f77bcf86cd799439011',
        email: 'teacher@example.com',
        firstName: 'Анна',
        lastName: 'Петрова',
        specialization: 'Фитнес-тренер',
        role: 'teacher',
        isActive: true,
        createdAt: '2024-01-01T00:00:00.000Z',
        updatedAt: '2024-01-01T00:00:00.000Z'
      }
    }
  })
  @ApiResponse({ 
    status: HttpStatus.BAD_REQUEST, 
    description: 'Неверные данные или преподаватель с таким email уже существует' 
  })
  @ApiResponse({ 
    status: HttpStatus.FORBIDDEN, 
    description: 'Недостаточно прав для создания преподавателя' 
  })
  create(@Body() createTeacherDto: CreateTeacherDto) {
    return this.teachersService.create(createTeacherDto);
  }

  @Get()
  @ApiOperation({ 
    summary: 'Получить список преподавателей',
    description: 'Возвращает список преподавателей с пагинацией и фильтрацией.'
  })
  @ApiQuery({ name: 'page', required: false, description: 'Номер страницы', example: 1 })
  @ApiQuery({ name: 'limit', required: false, description: 'Количество элементов на странице', example: 10 })
  @ApiQuery({ name: 'search', required: false, description: 'Поиск по имени, фамилии или email', example: 'Анна' })
  @ApiQuery({ name: 'specialization', required: false, description: 'Фильтр по специализации', example: 'Фитнес-тренер' })
  @ApiQuery({ name: 'skills', required: false, description: 'Фильтр по навыкам', example: 'йога,пилатес' })
  @ApiQuery({ name: 'isActive', required: false, description: 'Фильтр по статусу активности', example: true })
  @ApiQuery({ name: 'languages', required: false, description: 'Фильтр по языкам', example: 'русский,английский' })
  @ApiResponse({ 
    status: HttpStatus.OK, 
    description: 'Список преподавателей успешно получен',
    schema: {
      example: {
        data: [
          {
            _id: '507f1f77bcf86cd799439011',
            firstName: 'Анна',
            lastName: 'Петрова',
            email: 'teacher@example.com',
            specialization: 'Фитнес-тренер',
            skills: ['персональные тренировки', 'групповые занятия'],
            experience: 5,
            isActive: true
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
  @ApiResponse({ 
    status: HttpStatus.UNAUTHORIZED, 
    description: 'Пользователь не авторизован' 
  })
  findAll(@Query() query: QueryTeacherDto) {
    return this.teachersService.findAll(query);
  }

  @Get(':id')
  @ApiOperation({ 
    summary: 'Получить преподавателя по ID',
    description: 'Возвращает информацию о конкретном преподавателе по его ID.'
  })
  @ApiParam({ 
    name: 'id', 
    description: 'ID преподавателя (24-символьная hex строка)', 
    example: '507f1f77bcf86cd799439011' 
  })
  @ApiResponse({ 
    status: HttpStatus.OK, 
    description: 'Преподаватель найден',
    schema: {
      example: {
        _id: '507f1f77bcf86cd799439011',
        firstName: 'Анна',
        lastName: 'Петрова',
        email: 'teacher@example.com',
        specialization: 'Фитнес-тренер',
        skills: ['персональные тренировки', 'групповые занятия', 'йога'],
        experience: 5,
        bio: 'Опытный фитнес-тренер с 5-летним стажем работы',
        languages: ['русский', 'английский'],
        isActive: true,
        courses: [
          {
            _id: '507f1f77bcf86cd799439012',
            title: 'Основы фитнеса для начинающих'
          }
        ]
      }
    }
  })
  @ApiResponse({ 
    status: HttpStatus.NOT_FOUND, 
    description: 'Преподаватель не найден' 
  })
  @ApiResponse({ 
    status: HttpStatus.BAD_REQUEST, 
    description: 'Невалидный ID преподавателя' 
  })
  @ApiResponse({ 
    status: HttpStatus.UNAUTHORIZED, 
    description: 'Пользователь не авторизован' 
  })
  findOne(@Param('id') id: string) {
    return this.teachersService.findOne(id);
  }

  @Patch(':id')
  @Roles(UserRole.ADMIN, UserRole.SUPERADMIN)
  @ApiOperation({ 
    summary: 'Обновить преподавателя',
    description: 'Обновляет информацию о существующем преподавателе. Доступно только администраторам и выше.'
  })
  @ApiParam({ 
    name: 'id', 
    description: 'ID преподавателя (24-символьная hex строка)', 
    example: '507f1f77bcf86cd799439011' 
  })
  @ApiResponse({ 
    status: HttpStatus.OK, 
    description: 'Преподаватель успешно обновлен',
    schema: {
      example: {
        _id: '507f1f77bcf86cd799439011',
        firstName: 'Анна',
        lastName: 'Петрова',
        email: 'teacher@example.com',
        specialization: 'Фитнес-тренер и инструктор по йоге',
        skills: ['персональные тренировки', 'групповые занятия', 'йога', 'пилатес'],
        experience: 6,
        updatedAt: '2024-01-02T00:00:00.000Z'
      }
    }
  })
  @ApiResponse({ 
    status: HttpStatus.NOT_FOUND, 
    description: 'Преподаватель не найден' 
  })
  @ApiResponse({ 
    status: HttpStatus.BAD_REQUEST, 
    description: 'Неверные данные или преподаватель с таким email уже существует' 
  })
  @ApiResponse({ 
    status: HttpStatus.FORBIDDEN, 
    description: 'Недостаточно прав для обновления преподавателя' 
  })
  @ApiResponse({ 
    status: HttpStatus.UNAUTHORIZED, 
    description: 'Пользователь не авторизован' 
  })
  update(@Param('id') id: string, @Body() updateTeacherDto: UpdateTeacherDto) {
    return this.teachersService.update(id, updateTeacherDto);
  }

  @Delete(':id')
  @Roles(UserRole.ADMIN, UserRole.SUPERADMIN)
  @ApiOperation({ 
    summary: 'Удалить преподавателя',
    description: 'Удаляет преподавателя из системы. Доступно только администраторам и выше.'
  })
  @ApiParam({ 
    name: 'id', 
    description: 'ID преподавателя (24-символьная hex строка)', 
    example: '507f1f77bcf86cd799439011' 
  })
  @ApiResponse({ 
    status: HttpStatus.OK, 
    description: 'Преподаватель успешно удален' 
  })
  @ApiResponse({ 
    status: HttpStatus.NOT_FOUND, 
    description: 'Преподаватель не найден' 
  })
  @ApiResponse({ 
    status: HttpStatus.BAD_REQUEST, 
    description: 'Невалидный ID преподавателя' 
  })
  @ApiResponse({ 
    status: HttpStatus.FORBIDDEN, 
    description: 'Недостаточно прав для удаления преподавателя' 
  })
  @ApiResponse({ 
    status: HttpStatus.UNAUTHORIZED, 
    description: 'Пользователь не авторизован' 
  })
  remove(@Param('id') id: string) {
    return this.teachersService.remove(id);
  }

  @Post(':id/courses/:courseId')
  @Roles(UserRole.ADMIN, UserRole.SUPERADMIN)
  @ApiOperation({ 
    summary: 'Добавить курс к преподавателю',
    description: 'Добавляет курс к списку курсов преподавателя. Доступно только администраторам и выше.'
  })
  @ApiParam({ 
    name: 'id', 
    description: 'ID преподавателя (24-символьная hex строка)', 
    example: '507f1f77bcf86cd799439011' 
  })
  @ApiParam({ 
    name: 'courseId', 
    description: 'ID курса (24-символьная hex строка)', 
    example: '507f1f77bcf86cd799439012' 
  })
  @ApiResponse({ 
    status: HttpStatus.OK, 
    description: 'Курс успешно добавлен к преподавателю' 
  })
  @ApiResponse({ 
    status: HttpStatus.NOT_FOUND, 
    description: 'Преподаватель или курс не найден' 
  })
  @ApiResponse({ 
    status: HttpStatus.BAD_REQUEST, 
    description: 'Невалидный ID или курс уже добавлен' 
  })
  @ApiResponse({ 
    status: HttpStatus.FORBIDDEN, 
    description: 'Недостаточно прав для выполнения операции' 
  })
  @ApiResponse({ 
    status: HttpStatus.UNAUTHORIZED, 
    description: 'Пользователь не авторизован' 
  })
  addCourse(
    @Param('id') id: string,
    @Param('courseId') courseId: string,
  ) {
    return this.teachersService.addCourse(id, courseId);
  }

  @Delete(':id/courses/:courseId')
  @Roles(UserRole.ADMIN, UserRole.SUPERADMIN)
  @ApiOperation({ 
    summary: 'Убрать курс у преподавателя',
    description: 'Убирает курс из списка курсов преподавателя. Доступно только администраторам и выше.'
  })
  @ApiParam({ 
    name: 'id', 
    description: 'ID преподавателя (24-символьная hex строка)', 
    example: '507f1f77bcf86cd799439011' 
  })
  @ApiParam({ 
    name: 'courseId', 
    description: 'ID курса (24-символьная hex строка)', 
    example: '507f1f77bcf86cd799439012' 
  })
  @ApiResponse({ 
    status: HttpStatus.OK, 
    description: 'Курс успешно убран у преподавателя' 
  })
  @ApiResponse({ 
    status: HttpStatus.NOT_FOUND, 
    description: 'Преподаватель не найден' 
  })
  @ApiResponse({ 
    status: HttpStatus.BAD_REQUEST, 
    description: 'Невалидный ID' 
  })
  @ApiResponse({ 
    status: HttpStatus.FORBIDDEN, 
    description: 'Недостаточно прав для выполнения операции' 
  })
  @ApiResponse({ 
    status: HttpStatus.UNAUTHORIZED, 
    description: 'Пользователь не авторизован' 
  })
  removeCourse(
    @Param('id') id: string,
    @Param('courseId') courseId: string,
  ) {
    return this.teachersService.removeCourse(id, courseId);
  }

  @Patch(':id/password')
  @Roles(UserRole.ADMIN, UserRole.SUPERADMIN)
  @ApiOperation({ 
    summary: 'Изменить пароль преподавателя',
    description: 'Изменяет пароль преподавателя. Доступно только администраторам и выше.'
  })
  @ApiParam({ 
    name: 'id', 
    description: 'ID преподавателя (24-символьная hex строка)', 
    example: '507f1f77bcf86cd799439011' 
  })
  @ApiResponse({ 
    status: HttpStatus.OK, 
    description: 'Пароль успешно изменен' 
  })
  @ApiResponse({ 
    status: HttpStatus.NOT_FOUND, 
    description: 'Преподаватель не найден' 
  })
  @ApiResponse({ 
    status: HttpStatus.BAD_REQUEST, 
    description: 'Невалидный ID преподавателя' 
  })
  @ApiResponse({ 
    status: HttpStatus.FORBIDDEN, 
    description: 'Недостаточно прав для изменения пароля' 
  })
  @ApiResponse({ 
    status: HttpStatus.UNAUTHORIZED, 
    description: 'Пользователь не авторизован' 
  })
  updatePassword(
    @Param('id') id: string,
    @Body('newPassword') newPassword: string,
  ) {
    return this.teachersService.updatePassword(id, newPassword);
  }

  @Patch(':id/verify-email')
  @Roles(UserRole.ADMIN, UserRole.SUPERADMIN)
  @ApiOperation({ 
    summary: 'Подтвердить email преподавателя',
    description: 'Отмечает email преподавателя как подтвержденный. Доступно только администраторам и выше.'
  })
  @ApiParam({ 
    name: 'id', 
    description: 'ID преподавателя (24-символьная hex строка)', 
    example: '507f1f77bcf86cd799439011' 
  })
  @ApiResponse({ 
    status: HttpStatus.OK, 
    description: 'Email успешно подтвержден' 
  })
  @ApiResponse({ 
    status: HttpStatus.NOT_FOUND, 
    description: 'Преподаватель не найден' 
  })
  @ApiResponse({ 
    status: HttpStatus.BAD_REQUEST, 
    description: 'Невалидный ID преподавателя' 
  })
  @ApiResponse({ 
    status: HttpStatus.FORBIDDEN, 
    description: 'Недостаточно прав для подтверждения email' 
  })
  @ApiResponse({ 
    status: HttpStatus.UNAUTHORIZED, 
    description: 'Пользователь не авторизован' 
  })
  verifyEmail(@Param('id') id: string) {
    return this.teachersService.verifyEmail(id);
  }
}
