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
        companyId: '507f1f77bcf86cd799439012',
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
    description: 'Возвращает список преподавателей с пагинацией и фильтрацией. Администраторы видят всех преподавателей, обычные пользователи - только своей компании.'
  })
  @ApiQuery({ name: 'page', required: false, description: 'Номер страницы', example: 1 })
  @ApiQuery({ name: 'limit', required: false, description: 'Количество элементов на странице', example: 10 })
  @ApiQuery({ name: 'search', required: false, description: 'Поиск по имени, фамилии или email', example: 'Анна' })
  @ApiQuery({ name: 'specialization', required: false, description: 'Фильтр по специализации', example: 'Фитнес-тренер' })
  @ApiQuery({ name: 'skills', required: false, description: 'Фильтр по навыкам', example: 'йога,пилатес' })
  @ApiQuery({ name: 'companyId', required: false, description: 'Фильтр по компании', example: '507f1f77bcf86cd799439012' })
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
  findAll(@Query() query: QueryTeacherDto, @Request() req) {
    const userCompanyId = req.user.role === UserRole.ADMIN || req.user.role === UserRole.SUPERADMIN 
      ? undefined 
      : req.user.companyId;
    return this.teachersService.findAll(query, userCompanyId);
  }

  @Get('company/:companyId')
  @ApiOperation({ 
    summary: 'Получить преподавателей по компании',
    description: 'Возвращает список активных преподавателей конкретной компании'
  })
  @ApiParam({ name: 'companyId', description: 'ID компании', example: '507f1f77bcf86cd799439012' })
  @ApiResponse({ 
    status: HttpStatus.OK, 
    description: 'Список преподавателей компании получен' 
  })
  findByCompany(@Param('companyId') companyId: string) {
    return this.teachersService.findByCompany(companyId);
  }

  @Get('specialization/:specialization')
  @ApiOperation({ 
    summary: 'Найти преподавателей по специализации',
    description: 'Возвращает список преподавателей с определенной специализацией'
  })
  @ApiParam({ name: 'specialization', description: 'Специализация', example: 'Фитнес-тренер' })
  @ApiQuery({ name: 'companyId', required: false, description: 'ID компании для фильтрации' })
  @ApiResponse({ 
    status: HttpStatus.OK, 
    description: 'Список преподавателей по специализации получен' 
  })
  findBySpecialization(
    @Param('specialization') specialization: string,
    @Query('companyId') companyId?: string
  ) {
    return this.teachersService.findBySpecialization(specialization, companyId);
  }

  @Get(':id')
  @ApiOperation({ 
    summary: 'Получить преподавателя по ID',
    description: 'Возвращает информацию о конкретном преподавателе'
  })
  @ApiParam({ name: 'id', description: 'ID преподавателя', example: '507f1f77bcf86cd799439011' })
  @ApiResponse({ 
    status: HttpStatus.OK, 
    description: 'Информация о преподавателе получена' 
  })
  @ApiResponse({ 
    status: HttpStatus.NOT_FOUND, 
    description: 'Преподаватель не найден' 
  })
  findOne(@Param('id') id: string, @Request() req) {
    const userCompanyId = req.user.role === UserRole.ADMIN || req.user.role === UserRole.SUPERADMIN 
      ? undefined 
      : req.user.companyId;
    return this.teachersService.findOne(id, userCompanyId);
  }

  @Patch(':id')
  @Roles(UserRole.ADMIN, UserRole.SUPERADMIN)
  @ApiOperation({ 
    summary: 'Обновить преподавателя',
    description: 'Обновляет информацию о преподавателе. Доступно только администраторам и выше.'
  })
  @ApiParam({ name: 'id', description: 'ID преподавателя', example: '507f1f77bcf86cd799439011' })
  @ApiResponse({ 
    status: HttpStatus.OK, 
    description: 'Преподаватель успешно обновлен' 
  })
  @ApiResponse({ 
    status: HttpStatus.NOT_FOUND, 
    description: 'Преподаватель не найден' 
  })
  @ApiResponse({ 
    status: HttpStatus.FORBIDDEN, 
    description: 'Недостаточно прав для обновления преподавателя' 
  })
  update(
    @Param('id') id: string, 
    @Body() updateTeacherDto: UpdateTeacherDto,
    @Request() req
  ) {
    const userCompanyId = req.user.role === UserRole.ADMIN || req.user.role === UserRole.SUPERADMIN 
      ? undefined 
      : req.user.companyId;
    return this.teachersService.update(id, updateTeacherDto, userCompanyId);
  }

  @Delete(':id')
  @Roles(UserRole.ADMIN, UserRole.SUPERADMIN)
  @ApiOperation({ 
    summary: 'Удалить преподавателя',
    description: 'Удаляет преподавателя из системы. Доступно только администраторам и выше.'
  })
  @ApiParam({ name: 'id', description: 'ID преподавателя', example: '507f1f77bcf86cd799439011' })
  @ApiResponse({ 
    status: HttpStatus.OK, 
    description: 'Преподаватель успешно удален' 
  })
  @ApiResponse({ 
    status: HttpStatus.NOT_FOUND, 
    description: 'Преподаватель не найден' 
  })
  @ApiResponse({ 
    status: HttpStatus.FORBIDDEN, 
    description: 'Недостаточно прав для удаления преподавателя' 
  })
  remove(@Param('id') id: string, @Request() req) {
    const userCompanyId = req.user.role === UserRole.ADMIN || req.user.role === UserRole.SUPERADMIN 
      ? undefined 
      : req.user.companyId;
    return this.teachersService.remove(id, userCompanyId);
  }

  @Post(':id/courses/:courseId')
  @Roles(UserRole.ADMIN, UserRole.SUPERADMIN)
  @ApiOperation({ 
    summary: 'Добавить курс преподавателю',
    description: 'Добавляет курс в список курсов преподавателя. Доступно только администраторам и выше.'
  })
  @ApiParam({ name: 'id', description: 'ID преподавателя', example: '507f1f77bcf86cd799439011' })
  @ApiParam({ name: 'courseId', description: 'ID курса', example: '507f1f77bcf86cd799439013' })
  @ApiResponse({ 
    status: HttpStatus.OK, 
    description: 'Курс успешно добавлен преподавателю' 
  })
  addCourse(
    @Param('id') id: string,
    @Param('courseId') courseId: string,
    @Request() req
  ) {
    const userCompanyId = req.user.role === UserRole.ADMIN || req.user.role === UserRole.SUPERADMIN 
      ? undefined 
      : req.user.companyId;
    return this.teachersService.addCourse(id, courseId, userCompanyId);
  }

  @Delete(':id/courses/:courseId')
  @Roles(UserRole.ADMIN, UserRole.SUPERADMIN)
  @ApiOperation({ 
    summary: 'Убрать курс у преподавателя',
    description: 'Убирает курс из списка курсов преподавателя. Доступно только администраторам и выше.'
  })
  @ApiParam({ name: 'id', description: 'ID преподавателя', example: '507f1f77bcf86cd799439011' })
  @ApiParam({ name: 'courseId', description: 'ID курса', example: '507f1f77bcf86cd799439013' })
  @ApiResponse({ 
    status: HttpStatus.OK, 
    description: 'Курс успешно убран у преподавателя' 
  })
  removeCourse(
    @Param('id') id: string,
    @Param('courseId') courseId: string,
    @Request() req
  ) {
    const userCompanyId = req.user.role === UserRole.ADMIN || req.user.role === UserRole.SUPERADMIN 
      ? undefined 
      : req.user.companyId;
    return this.teachersService.removeCourse(id, courseId, userCompanyId);
  }
}
