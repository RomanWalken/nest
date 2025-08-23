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
import { ModulesService } from './modules.service';
import { CreateModuleDto } from './dto/create-module.dto';
import { UpdateModuleDto } from './dto/update-module.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '@/common/types';
import { PaginationDto } from '@/common/types';

@ApiTags('course-modules')
@Controller('course-modules')
export class CourseModulesController {
  constructor(private readonly modulesService: ModulesService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.MODERATOR, UserRole.ADMIN, UserRole.SUPERADMIN)
  @ApiBearerAuth()
  @ApiOperation({ 
    summary: 'Создать новый модуль курса',
    description: 'Создает новый модуль в рамках курса. Модули структурируют контент курса и могут содержать несколько уроков.'
  })
  @ApiResponse({ 
    status: 201, 
    description: 'Модуль успешно создан',
    schema: {
      example: {
        _id: '507f1f77bcf86cd799439011',
        title: 'Введение в фитнес',
        description: 'Базовые принципы фитнеса и здорового образа жизни',
        order: 1,
        isFree: false,
        courseId: '507f1f77bcf86cd799439012',
        createdAt: '2024-01-15T10:30:00.000Z',
        updatedAt: '2024-01-15T10:30:00.000Z'
      }
    }
  })
  @ApiResponse({ status: 400, description: 'Неверные данные' })
  @ApiResponse({ status: 401, description: 'Пользователь не авторизован' })
  @ApiResponse({ status: 403, description: 'Недостаточно прав' })
  create(@Body() createModuleDto: CreateModuleDto, @Request() req) {
    return this.modulesService.create(createModuleDto);
  }

  @Get()
  @ApiOperation({ 
    summary: 'Получить список модулей курса',
    description: 'Возвращает список модулей с пагинацией. Можно фильтровать по конкретному курсу.'
  })
  @ApiQuery({ name: 'page', required: false, description: 'Номер страницы', example: 1 })
  @ApiQuery({ name: 'limit', required: false, description: 'Количество модулей на странице', example: 10 })
  @ApiQuery({ name: 'courseId', required: false, description: 'ID курса для фильтрации', example: '507f1f77bcf86cd799439012' })
  @ApiResponse({ 
    status: 200, 
    description: 'Список модулей получен',
    schema: {
      example: {
        data: [
          {
            _id: '507f1f77bcf86cd799439011',
            title: 'Введение в фитнес',
            order: 1,
            isFree: false,
            courseId: {
              _id: '507f1f77bcf86cd799439012',
              title: 'Основы фитнеса',
              slug: 'osnovy-fitnesa'
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
  findAll(@Query() paginationDto: PaginationDto, @Query('courseId') courseId?: string) {
    return this.modulesService.findAll(paginationDto, courseId);
  }

  @Get('course/:courseId')
  @ApiOperation({ 
    summary: 'Получить все модули курса',
    description: 'Возвращает все модули конкретного курса, отсортированные по порядку.'
  })
  @ApiParam({ name: 'courseId', description: 'ID курса', example: '507f1f77bcf86cd799439012' })
  @ApiResponse({ 
    status: 200, 
    description: 'Модули курса получены',
    schema: {
      example: [
        {
          _id: '507f1f77bcf86cd799439011',
          title: 'Введение в фитнес',
          order: 1,
          isFree: false
        },
        {
          _id: '507f1f77bcf86cd799439013',
          title: 'Базовые упражнения',
          order: 2,
          isFree: false
        }
      ]
    }
  })
  findByCourse(@Param('courseId') courseId: string) {
    return this.modulesService.findByCourse(courseId);
  }

  @Get(':id')
  @ApiOperation({ 
    summary: 'Получить модуль по ID',
    description: 'Возвращает детальную информацию о модуле курса.'
  })
  @ApiParam({ name: 'id', description: 'ID модуля', example: '507f1f77bcf86cd799439011' })
  @ApiResponse({ 
    status: 200, 
    description: 'Модуль найден',
    schema: {
      example: {
        _id: '507f1f77bcf86cd799439011',
        title: 'Введение в фитнес',
        description: 'Базовые принципы фитнеса и здорового образа жизни',
        order: 1,
        isFree: false,
        courseId: {
          _id: '507f1f77bcf86cd799439012',
          title: 'Основы фитнеса',
          slug: 'osnovy-fitnesa'
        }
      }
    }
  })
  @ApiResponse({ status: 404, description: 'Модуль не найден' })
  findOne(@Param('id') id: string) {
    return this.modulesService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.MODERATOR, UserRole.ADMIN, UserRole.SUPERADMIN)
  @ApiBearerAuth()
  @ApiOperation({ 
    summary: 'Обновить модуль',
    description: 'Обновляет существующий модуль курса.'
  })
  @ApiParam({ name: 'id', description: 'ID модуля', example: '507f1f77bcf86cd799439011' })
  @ApiResponse({ 
    status: 200, 
    description: 'Модуль успешно обновлен'
  })
  @ApiResponse({ status: 400, description: 'Неверные данные' })
  @ApiResponse({ status: 404, description: 'Модуль не найден' })
  update(@Param('id') id: string, @Body() updateModuleDto: UpdateModuleDto) {
    return this.modulesService.update(id, updateModuleDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.SUPERADMIN)
  @ApiBearerAuth()
  @ApiOperation({ 
    summary: 'Удалить модуль',
    description: 'Удаляет модуль курса. Операция необратима!'
  })
  @ApiParam({ name: 'id', description: 'ID модуля', example: '507f1f77bcf86cd799439011' })
  @ApiResponse({ status: 200, description: 'Модуль успешно удален' })
  @ApiResponse({ status: 404, description: 'Модуль не найден' })
  remove(@Param('id') id: string) {
    return this.modulesService.remove(id);
  }
} 