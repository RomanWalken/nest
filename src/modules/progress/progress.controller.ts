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
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '@/common/types';
import { PaginationDto } from '@/common/types';

@ApiTags('user-progress')
@Controller('user-progress')
export class UserProgressController {
  constructor() {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Создать запись о прогрессе' })
  @ApiResponse({ status: 201, description: 'Прогресс успешно создан' })
  @ApiResponse({ status: 400, description: 'Неверные данные' })
  create(@Body() createProgressDto: any, @Request() req) {
    // TODO: Реализовать создание прогресса
    return { message: 'Прогресс создан', data: createProgressDto };
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Получить прогресс пользователя' })
  @ApiResponse({ status: 200, description: 'Прогресс получен' })
  findAll(@Query() paginationDto: PaginationDto, @Request() req) {
    // TODO: Реализовать получение прогресса
    return { message: 'Прогресс пользователя', data: [], meta: { page: 1, limit: 10, total: 0, totalPages: 0 } };
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Получить прогресс по ID' })
  @ApiResponse({ status: 200, description: 'Прогресс найден' })
  @ApiResponse({ status: 404, description: 'Прогресс не найден' })
  findOne(@Param('id') id: string, @Request() req) {
    // TODO: Реализовать получение прогресса
    return { message: 'Прогресс найден', data: { id, progressPercentage: 0 } };
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Обновить прогресс' })
  @ApiResponse({ status: 200, description: 'Прогресс успешно обновлен' })
  @ApiResponse({ status: 404, description: 'Прогресс не найден' })
  update(@Param('id') id: string, @Body() updateProgressDto: any, @Request() req) {
    // TODO: Реализовать обновление прогресса
    return { message: 'Прогресс обновлен', data: { id, ...updateProgressDto } };
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.SUPERADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Удалить прогресс' })
  @ApiResponse({ status: 200, description: 'Прогресс успешно удален' })
  @ApiResponse({ status: 404, description: 'Прогресс не найден' })
  remove(@Param('id') id: string) {
    // TODO: Реализовать удаление прогресса
    return { message: 'Прогресс удален', data: { id } };
  }
} 