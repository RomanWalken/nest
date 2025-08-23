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
import { LessonsService } from './lessons.service';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '@/common/types';
import { PaginationDto } from '@/common/types';

@ApiTags('lessons')
@Controller('lessons')
export class LessonsController {
  constructor(private readonly lessonsService: LessonsService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.MODERATOR, UserRole.ADMIN, UserRole.SUPERADMIN)
  @ApiBearerAuth()
  @ApiOperation({ 
    summary: 'Создать новый урок',
    description: 'Создает новый урок в рамках модуля курса. Урок может содержать текст, видео и прикрепленные файлы.'
  })
  @ApiResponse({ 
    status: 201, 
    description: 'Урок успешно создан'
  })
  @ApiResponse({ status: 400, description: 'Неверные данные' })
  @ApiResponse({ status: 401, description: 'Пользователь не авторизован' })
  @ApiResponse({ status: 403, description: 'Недостаточно прав' })
  create(@Body() createLessonDto: CreateLessonDto, @Request() req) {
    return this.lessonsService.create(createLessonDto);
  }

  @Get()
  @ApiOperation({ 
    summary: 'Получить список уроков',
    description: 'Возвращает список уроков с пагинацией. Можно фильтровать по модулю.'
  })
  @ApiQuery({ name: 'page', required: false, description: 'Номер страницы', example: 1 })
  @ApiQuery({ name: 'limit', required: false, description: 'Количество уроков на странице', example: 10 })
  @ApiQuery({ name: 'moduleId', required: false, description: 'ID модуля для фильтрации', example: '507f1f77bcf86cd799439012' })
  @ApiResponse({ 
    status: 200, 
    description: 'Список уроков получен'
  })
  findAll(@Query() paginationDto: PaginationDto, @Query('moduleId') moduleId?: string) {
    return this.lessonsService.findAll(paginationDto, moduleId);
  }

  @Get('module/:moduleId')
  @ApiOperation({ 
    summary: 'Получить все уроки модуля',
    description: 'Возвращает все уроки конкретного модуля, отсортированные по порядку.'
  })
  @ApiParam({ name: 'moduleId', description: 'ID модуля', example: '507f1f77bcf86cd799439012' })
  @ApiResponse({ 
    status: 200, 
    description: 'Уроки модуля получены'
  })
  findByModule(@Param('moduleId') moduleId: string) {
    return this.lessonsService.findByModule(moduleId);
  }

  @Get('free')
  @ApiOperation({ 
    summary: 'Получить бесплатные уроки',
    description: 'Возвращает все бесплатные уроки для предварительного просмотра.'
  })
  @ApiQuery({ name: 'moduleId', required: false, description: 'ID модуля для фильтрации', example: '507f1f77bcf86cd799439012' })
  @ApiResponse({ 
    status: 200, 
    description: 'Бесплатные уроки получены'
  })
  getFreeContent(@Query('moduleId') moduleId?: string) {
    return this.lessonsService.getFreeContent(moduleId);
  }

  @Get(':id')
  @ApiOperation({ 
    summary: 'Получить урок по ID',
    description: 'Возвращает детальную информацию об уроке.'
  })
  @ApiParam({ name: 'id', description: 'ID урока', example: '507f1f77bcf86cd799439011' })
  @ApiResponse({ 
    status: 200, 
    description: 'Урок найден'
  })
  @ApiResponse({ status: 404, description: 'Урок не найден' })
  findOne(@Param('id') id: string) {
    return this.lessonsService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.MODERATOR, UserRole.ADMIN, UserRole.SUPERADMIN)
  @ApiBearerAuth()
  @ApiOperation({ 
    summary: 'Обновить урок',
    description: 'Обновляет существующий урок.'
  })
  @ApiParam({ name: 'id', description: 'ID урока', example: '507f1f77bcf86cd799439011' })
  @ApiResponse({ 
    status: 200, 
    description: 'Урок успешно обновлен'
  })
  @ApiResponse({ status: 400, description: 'Неверные данные' })
  @ApiResponse({ status: 404, description: 'Урок не найден' })
  update(@Param('id') id: string, @Body() updateLessonDto: UpdateLessonDto) {
    return this.lessonsService.update(id, updateLessonDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.SUPERADMIN)
  @ApiBearerAuth()
  @ApiOperation({ 
    summary: 'Удалить урок',
    description: 'Удаляет урок. Операция необратима!'
  })
  @ApiParam({ name: 'id', description: 'ID урока', example: '507f1f77bcf86cd799439011' })
  @ApiResponse({ status: 200, description: 'Урок успешно удален' })
  @ApiResponse({ status: 404, description: 'Урок не найден' })
  remove(@Param('id') id: string) {
    return this.lessonsService.remove(id);
  }
} 