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
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam } from '@nestjs/swagger';
import { CompaniesService } from './companies.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { PaginationDto } from '@/common/types';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '@/common/types';
import { Types } from 'mongoose';

@ApiTags('companies')
@Controller('companies')
export class CompaniesController {
  constructor(private readonly companiesService: CompaniesService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.SUPERADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Создать новую компанию' })
  @ApiResponse({ status: 201, description: 'Компания успешно создана' })
  @ApiResponse({ status: 400, description: 'Неверные данные' })
  @ApiResponse({ status: 409, description: 'Компания с таким slug или domain уже существует' })
  create(@Body() createCompanyDto: CreateCompanyDto, @Request() req) {
    return this.companiesService.create(createCompanyDto, req.user.id);
  }

  @Get()
  @ApiOperation({ summary: 'Получить список компаний' })
  @ApiResponse({ status: 200, description: 'Список компаний получен' })
  findAll(@Query() paginationDto: PaginationDto) {
    return this.companiesService.findAll(paginationDto);
  }

  @Get('slug/:slug')
  @ApiOperation({ summary: 'Получить компанию по slug' })
  @ApiParam({ name: 'slug', description: 'Slug компании', example: 'fitness-academy' })
  @ApiResponse({ status: 200, description: 'Компания найдена' })
  @ApiResponse({ status: 404, description: 'Компания не найдена' })
  findBySlug(@Param('slug') slug: string) {
    return this.companiesService.findBySlug(slug);
  }

  @Get('domain/:domain')
  @ApiOperation({ summary: 'Получить компанию по domain' })
  @ApiParam({ name: 'domain', description: 'Домен компании', example: 'fitness.example.com' })
  @ApiResponse({ status: 200, description: 'Компания найдена' })
  @ApiResponse({ status: 404, description: 'Компания не найдена' })
  findByDomain(@Param('domain') domain: string) {
    return this.companiesService.findByDomain(domain);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Получить компанию по ID' })
  @ApiParam({ name: 'id', description: 'ID компании (24-символьная hex строка)', example: '507f1f77bcf86cd799439011' })
  @ApiResponse({ status: 200, description: 'Компания найдена' })
  @ApiResponse({ status: 400, description: 'Невалидный ID компании' })
  @ApiResponse({ status: 404, description: 'Компания не найдена' })
  findOne(@Param('id') id: string) {
    // Дополнительная валидация в контроллере
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException(`Невалидный ID компании: ${id}. ID должен быть 24-символьной hex строкой.`);
    }
    return this.companiesService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.SUPERADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Обновить компанию' })
  @ApiParam({ name: 'id', description: 'ID компании (24-символьная hex строка)', example: '507f1f77bcf86cd799439011' })
  @ApiResponse({ status: 200, description: 'Компания успешно обновлена' })
  @ApiResponse({ status: 400, description: 'Невалидный ID компании' })
  @ApiResponse({ status: 404, description: 'Компания не найдена' })
  update(@Param('id') id: string, @Body() updateCompanyDto: UpdateCompanyDto) {
    // Дополнительная валидация в контроллере
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException(`Невалидный ID компании: ${id}. ID должен быть 24-символьной hex строкой.`);
    }
    return this.companiesService.update(id, updateCompanyDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.SUPERADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Удалить компанию' })
  @ApiParam({ name: 'id', description: 'ID компании (24-символьная hex строка)', example: '507f1f77bcf86cd799439011' })
  @ApiResponse({ status: 200, description: 'Компания успешно удалена' })
  @ApiResponse({ status: 400, description: 'Невалидный ID компании' })
  @ApiResponse({ status: 404, description: 'Компания не найдена' })
  remove(@Param('id') id: string) {
    // Дополнительная валидация в контроллере
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException(`Невалидный ID компании: ${id}. ID должен быть 24-символьной hex строкой.`);
    }
    return this.companiesService.remove(id);
  }
} 