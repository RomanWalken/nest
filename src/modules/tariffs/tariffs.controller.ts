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
import { TariffsService } from './tariffs.service';
import { CreateTariffDto } from './dto/create-tariff.dto';
import { UpdateTariffDto } from './dto/update-tariff.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '@/common/types';
import { PaginationDto } from '@/common/types';

@ApiTags('tariffs')
@Controller('tariffs')
export class TariffsController {
  constructor(private readonly tariffsService: TariffsService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.SUPERADMIN)
  @ApiBearerAuth()
  @ApiOperation({ 
    summary: 'Создать новый тариф',
    description: 'Создает новый тариф для курса. Доступно только администраторам и супер-администраторам. Тариф определяет стоимость и условия доступа к курсу.'
  })
  @ApiResponse({ 
    status: 201, 
    description: 'Тариф успешно создан',
    schema: {
      example: {
        _id: '507f1f77bcf86cd799439011',
        name: 'Базовый доступ на 30 дней',
        description: 'Доступ ко всем базовым урокам курса на 30 дней',
        price: 29.99,
        currency: 'USD',
        duration: 30,
        isActive: true,
        courseId: '507f1f77bcf86cd799439012',
        lessonIds: [],
        features: {
          includesCertificates: true,
          prioritySupport: false
        },
        createdAt: '2024-01-15T10:30:00.000Z',
        updatedAt: '2024-01-15T10:30:00.000Z'
      }
    }
  })
  @ApiResponse({ status: 400, description: 'Неверные данные или валидация не пройдена' })
  @ApiResponse({ status: 401, description: 'Пользователь не авторизован' })
  @ApiResponse({ status: 403, description: 'Недостаточно прав для создания тарифа' })
  create(@Body() createTariffDto: CreateTariffDto, @Request() req) {
    return this.tariffsService.create(createTariffDto);
  }

  @Get()
  @ApiOperation({ 
    summary: 'Получить список тарифов',
    description: 'Возвращает список тарифов с пагинацией. Можно фильтровать по конкретному курсу.'
  })
  @ApiQuery({ name: 'page', required: false, description: 'Номер страницы (по умолчанию 1)', example: 1 })
  @ApiQuery({ name: 'limit', required: false, description: 'Количество тарифов на странице (по умолчанию 10)', example: 10 })
  @ApiQuery({ name: 'courseId', required: false, description: 'ID курса для фильтрации', example: '507f1f77bcf86cd799439012' })
  @ApiResponse({ 
    status: 200, 
    description: 'Список тарифов получен',
    schema: {
      example: {
        data: [
          {
            _id: '507f1f77bcf86cd799439011',
            name: 'Базовый доступ на 30 дней',
            price: 29.99,
            currency: 'USD',
            duration: 30,
            isActive: true,
            courseId: {
              _id: '507f1f77bcf86cd799439012',
              title: 'Основы фитнеса для начинающих',
              slug: 'osnovy-fitnesa-dlya-nachinayushchih'
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
    return this.tariffsService.findAll(paginationDto, courseId);
  }

  @Get('course/:courseId')
  @ApiOperation({ 
    summary: 'Получить тарифы для курса',
    description: 'Возвращает все активные тарифы для конкретного курса, отсортированные по цене (от дешевых к дорогим).'
  })
  @ApiParam({ name: 'courseId', description: 'ID курса', example: '507f1f77bcf86cd799439012' })
  @ApiResponse({ 
    status: 200, 
    description: 'Тарифы для курса получены',
    schema: {
      example: [
        {
          _id: '507f1f77bcf86cd799439011',
          name: 'Базовый доступ на 30 дней',
          price: 29.99,
          currency: 'USD',
          duration: 30,
          isActive: true
        },
        {
          _id: '507f1f77bcf86cd799439012',
          name: 'Премиум доступ на 90 дней',
          price: 79.99,
          currency: 'USD',
          duration: 90,
          isActive: true
        }
      ]
    }
  })
  findByCourse(@Param('courseId') courseId: string) {
    return this.tariffsService.findByCourse(courseId);
  }

  @Get(':id')
  @ApiOperation({ 
    summary: 'Получить тариф по ID',
    description: 'Возвращает полную информацию о тарифе по его уникальному идентификатору. Включает данные о курсе и доступных уроках.'
  })
  @ApiParam({ name: 'id', description: 'Уникальный идентификатор тарифа', example: '507f1f77bcf86cd799439011' })
  @ApiResponse({ 
    status: 200, 
    description: 'Тариф найден',
    schema: {
      example: {
        _id: '507f1f77bcf86cd799439011',
        name: 'Базовый доступ на 30 дней',
        description: 'Доступ ко всем базовым урокам курса на 30 дней',
        price: 29.99,
        currency: 'USD',
        duration: 30,
        isActive: true,
        courseId: {
          _id: '507f1f77bcf86cd799439012',
          title: 'Основы фитнеса для начинающих',
          slug: 'osnovy-fitnesa-dlya-nachinayushchih'
        },
        lessonIds: [
          {
            _id: '507f1f77bcf86cd799439013',
            title: 'Введение в фитнес',
            order: 1
          }
        ]
      }
    }
  })
  @ApiResponse({ status: 404, description: 'Тариф не найден' })
  findOne(@Param('id') id: string) {
    return this.tariffsService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.SUPERADMIN)
  @ApiBearerAuth()
  @ApiOperation({ 
    summary: 'Обновить тариф',
    description: 'Обновляет существующий тариф. Доступно только администраторам и супер-администраторам. Можно изменить любые поля тарифа.'
  })
  @ApiParam({ name: 'id', description: 'Уникальный идентификатор тарифа', example: '507f1f77bcf86cd799439011' })
  @ApiResponse({ 
    status: 200, 
    description: 'Тариф успешно обновлен',
    schema: {
      example: {
        _id: '507f1f77bcf86cd799439011',
        name: 'Базовый доступ на 30 дней (обновлено)',
        price: 24.99,
        duration: 45
      }
    }
  })
  @ApiResponse({ status: 400, description: 'Неверные данные' })
  @ApiResponse({ status: 401, description: 'Пользователь не авторизован' })
  @ApiResponse({ status: 403, description: 'Недостаточно прав для обновления тарифа' })
  @ApiResponse({ status: 404, description: 'Тариф не найден' })
  update(@Param('id') id: string, @Body() updateTariffDto: UpdateTariffDto) {
    return this.tariffsService.update(id, updateTariffDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.SUPERADMIN)
  @ApiBearerAuth()
  @ApiOperation({ 
    summary: 'Удалить тариф',
    description: 'Полностью удаляет тариф из системы. Доступно только администраторам и супер-администраторам. Внимание: операция необратима!'
  })
  @ApiParam({ name: 'id', description: 'Уникальный идентификатор тарифа', example: '507f1f77bcf86cd799439011' })
  @ApiResponse({ 
    status: 200, 
    description: 'Тариф успешно удален',
    schema: {
      example: {
        message: 'Тариф успешно удален',
        deletedTariffId: '507f1f77bcf86cd799439011'
      }
    }
  })
  @ApiResponse({ status: 401, description: 'Пользователь не авторизован' })
  @ApiResponse({ status: 403, description: 'Недостаточно прав для удаления тарифа' })
  @ApiResponse({ status: 404, description: 'Тариф не найден' })
  remove(@Param('id') id: string) {
    return this.tariffsService.remove(id);
  }
} 