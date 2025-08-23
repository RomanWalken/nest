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
import { PurchasesService } from './purchases.service';
import { CreatePurchaseDto } from './dto/create-purchase.dto';
import { UpdatePurchaseDto } from './dto/update-purchase.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '@/common/types';
import { PaginationDto } from '@/common/types';

@ApiTags('purchases')
@Controller('purchases')
export class PurchasesController {
  constructor(private readonly purchasesService: PurchasesService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ 
    summary: 'Создать новую покупку',
    description: 'Создает новую покупку курса пользователем. Система автоматически проверяет, не имеет ли пользователь уже доступ к курсу, и рассчитывает срок действия доступа на основе тарифа.'
  })
  @ApiResponse({ 
    status: 201, 
    description: 'Покупка успешно создана',
    schema: {
      example: {
        _id: '507f1f77bcf86cd799439011',
        userId: '507f1f77bcf86cd799439012',
        courseId: '507f1f77bcf86cd799439013',
        tariffId: '507f1f77bcf86cd799439014',
        amount: 29.99,
        currency: 'USD',
        paymentMethod: 'stripe',
        paymentStatus: 'pending',
        accessExpiresAt: '2024-02-14T10:30:00.000Z',
        createdAt: '2024-01-15T10:30:00.000Z',
        updatedAt: '2024-01-15T10:30:00.000Z'
      }
    }
  })
  @ApiResponse({ status: 400, description: 'Неверные данные или валидация не пройдена' })
  @ApiResponse({ status: 401, description: 'Пользователь не авторизован' })
  @ApiResponse({ status: 409, description: 'Пользователь уже имеет доступ к курсу' })
  create(@Body() createPurchaseDto: CreatePurchaseDto, @Request() req) {
    return this.purchasesService.create(createPurchaseDto, req.user.id);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ 
    summary: 'Получить список покупок пользователя',
    description: 'Возвращает список покупок текущего авторизованного пользователя с пагинацией. Включает информацию о курсах и тарифах.'
  })
  @ApiQuery({ name: 'page', required: false, description: 'Номер страницы (по умолчанию 1)', example: 1 })
  @ApiQuery({ name: 'limit', required: false, description: 'Количество покупок на странице (по умолчанию 10)', example: 10 })
  @ApiResponse({ 
    status: 200, 
    description: 'Список покупок получен',
    schema: {
      example: {
        data: [
          {
            _id: '507f1f77bcf86cd799439011',
            amount: 29.99,
            currency: 'USD',
            paymentMethod: 'stripe',
            paymentStatus: 'completed',
            accessExpiresAt: '2024-02-14T10:30:00.000Z',
            courseId: {
              _id: '507f1f77bcf86cd799439013',
              title: 'Основы фитнеса для начинающих',
              slug: 'osnovy-fitnesa-dlya-nachinayushchih',
              thumbnail: 'https://example.com/thumbnails/fitness.jpg'
            },
            tariffId: {
              _id: '507f1f77bcf86cd799439014',
              name: 'Базовый доступ на 30 дней',
              price: 29.99,
              currency: 'USD',
              duration: 30
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
  @ApiResponse({ status: 401, description: 'Пользователь не авторизован' })
  findAll(@Query() paginationDto: PaginationDto, @Request() req) {
    return this.purchasesService.findAll(paginationDto, req.user.id);
  }

  @Get('my-purchases')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ 
    summary: 'Получить все покупки пользователя',
    description: 'Возвращает все завершенные покупки текущего пользователя без пагинации. Полезно для отображения списка доступных курсов.'
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Список покупок пользователя получен',
    schema: {
      example: [
        {
          _id: '507f1f77bcf86cd799439011',
          amount: 29.99,
          currency: 'USD',
          paymentStatus: 'completed',
          courseId: {
            _id: '507f1f77bcf86cd799439013',
            title: 'Основы фитнеса для начинающих',
            slug: 'osnovy-fitnesa-dlya-nachinayushchih',
            thumbnail: 'https://example.com/thumbnails/fitness.jpg'
          },
          tariffId: {
            _id: '507f1f77bcf86cd799439014',
            name: 'Базовый доступ на 30 дней',
            price: 29.99,
            currency: 'USD',
            duration: 30
          }
        }
      ]
    }
  })
  @ApiResponse({ status: 401, description: 'Пользователь не авторизован' })
  findMyPurchases(@Request() req) {
    return this.purchasesService.findUserPurchases(req.user.id);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ 
    summary: 'Получить покупку по ID',
    description: 'Возвращает детальную информацию о конкретной покупке. Пользователь может получить только свои покупки.'
  })
  @ApiParam({ name: 'id', description: 'Уникальный идентификатор покупки', example: '507f1f77bcf86cd799439011' })
  @ApiResponse({ 
    status: 200, 
    description: 'Покупка найдена',
    schema: {
      example: {
        _id: '507f1f77bcf86cd799439011',
        userId: {
          _id: '507f1f77bcf86cd799439012',
          firstName: 'Иван',
          lastName: 'Петров',
          email: 'ivan.petrov@example.com'
        },
        amount: 29.99,
        currency: 'USD',
        paymentMethod: 'stripe',
        paymentStatus: 'completed',
        accessExpiresAt: '2024-02-14T10:30:00.000Z',
        courseId: {
          _id: '507f1f77bcf86cd799439013',
          title: 'Основы фитнеса для начинающих',
          slug: 'osnovy-fitnesa-dlya-nachinayushchih',
          thumbnail: 'https://example.com/thumbnails/fitness.jpg'
        },
        tariffId: {
          _id: '507f1f77bcf86cd799439014',
          name: 'Базовый доступ на 30 дней',
          price: 29.99,
          currency: 'USD',
          duration: 30
        }
      }
    }
  })
  @ApiResponse({ status: 401, description: 'Пользователь не авторизован' })
  @ApiResponse({ status: 404, description: 'Покупка не найдена' })
  findOne(@Param('id') id: string, @Request() req) {
    return this.purchasesService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.SUPERADMIN)
  @ApiBearerAuth()
  @ApiOperation({ 
    summary: 'Обновить покупку',
    description: 'Обновляет существующую покупку. Доступно только администраторам и супер-администраторам. Обычно используется для обновления статуса платежа.'
  })
  @ApiParam({ name: 'id', description: 'Уникальный идентификатор покупки', example: '507f1f77bcf86cd799439011' })
  @ApiResponse({ 
    status: 200, 
    description: 'Покупка успешно обновлена',
    schema: {
      example: {
        _id: '507f1f77bcf86cd799439011',
        paymentStatus: 'completed',
        transactionId: 'txn_1234567890abcdef'
      }
    }
  })
  @ApiResponse({ status: 400, description: 'Неверные данные' })
  @ApiResponse({ status: 401, description: 'Пользователь не авторизован' })
  @ApiResponse({ status: 403, description: 'Недостаточно прав для обновления покупки' })
  @ApiResponse({ status: 404, description: 'Покупка не найдена' })
  update(@Param('id') id: string, @Body() updatePurchaseDto: UpdatePurchaseDto) {
    return this.purchasesService.update(id, updatePurchaseDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.SUPERADMIN)
  @ApiBearerAuth()
  @ApiOperation({ 
    summary: 'Удалить покупку',
    description: 'Полностью удаляет покупку из системы. Доступно только администраторам и супер-администраторам. Внимание: операция необратима!'
  })
  @ApiParam({ name: 'id', description: 'Уникальный идентификатор покупки', example: '507f1f77bcf86cd799439011' })
  @ApiResponse({ 
    status: 200, 
    description: 'Покупка успешно удалена',
    schema: {
      example: {
        message: 'Покупка успешно удалена',
        deletedPurchaseId: '507f1f77bcf86cd799439011'
      }
    }
  })
  @ApiResponse({ status: 401, description: 'Пользователь не авторизован' })
  @ApiResponse({ status: 403, description: 'Недостаточно прав для удаления покупки' })
  @ApiResponse({ status: 404, description: 'Покупка не найдена' })
  remove(@Param('id') id: string) {
    return this.purchasesService.remove(id);
  }
} 