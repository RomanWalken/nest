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
import { MealsService } from './meals.service';
import { CreateMealDto } from './dto/create-meal.dto';
import { UpdateMealDto } from './dto/update-meal.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '@/common/types';
import { PaginationDto } from '@/common/types';

@ApiTags('meals')
@Controller('meals')
export class MealsController {
  constructor(private readonly mealsService: MealsService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.MODERATOR, UserRole.ADMIN, UserRole.SUPERADMIN)
  @ApiBearerAuth()
  @ApiOperation({ 
    summary: 'Создать новый план питания',
    description: 'Создает новый план питания для wellness курсов. Включает детальную информацию о питательной ценности, рецепте и ингредиентах.'
  })
  @ApiResponse({ 
    status: 201, 
    description: 'План питания успешно создан',
    schema: {
      example: {
        _id: '507f1f77bcf86cd799439011',
        name: 'Завтрак для похудения',
        description: 'Сбалансированный завтрак с высоким содержанием белка и клетчатки',
        calories: 350,
        proteins: 25,
        fats: 12,
        carbohydrates: 45,
        courseId: '507f1f77bcf86cd799439012',
        createdAt: '2024-01-15T10:30:00.000Z',
        updatedAt: '2024-01-15T10:30:00.000Z'
      }
    }
  })
  @ApiResponse({ status: 400, description: 'Неверные данные' })
  @ApiResponse({ status: 401, description: 'Пользователь не авторизован' })
  @ApiResponse({ status: 403, description: 'Недостаточно прав' })
  create(@Body() createMealDto: CreateMealDto, @Request() req) {
    return this.mealsService.create(createMealDto);
  }

  @Get()
  @ApiOperation({ 
    summary: 'Получить список планов питания',
    description: 'Возвращает список планов питания с пагинацией. Можно фильтровать по курсу.'
  })
  @ApiQuery({ name: 'page', required: false, description: 'Номер страницы', example: 1 })
  @ApiQuery({ name: 'limit', required: false, description: 'Количество планов на странице', example: 10 })
  @ApiQuery({ name: 'courseId', required: false, description: 'ID курса для фильтрации', example: '507f1f77bcf86cd799439012' })
  @ApiResponse({ 
    status: 200, 
    description: 'Список планов питания получен',
    schema: {
      example: {
        data: [
          {
            _id: '507f1f77bcf86cd799439011',
            name: 'Завтрак для похудения',
            calories: 350,
            proteins: 25,
            fats: 12,
            carbohydrates: 45,
            courseId: {
              _id: '507f1f77bcf86cd799439012',
              title: 'Основы здорового питания',
              slug: 'osnovy-zdorovogo-pitaniya'
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
    return this.mealsService.findAll(paginationDto, courseId);
  }

  @Get('course/:courseId')
  @ApiOperation({ 
    summary: 'Получить все планы питания курса',
    description: 'Возвращает все планы питания конкретного курса.'
  })
  @ApiParam({ name: 'courseId', description: 'ID курса', example: '507f1f77bcf86cd799439012' })
  @ApiResponse({ 
    status: 200, 
    description: 'Планы питания курса получены',
    schema: {
      example: [
        {
          _id: '507f1f77bcf86cd799439011',
          name: 'Завтрак для похудения',
          calories: 350,
          proteins: 25
        },
        {
          _id: '507f1f77bcf86cd799439013',
          name: 'Обед с куриной грудкой',
          calories: 450,
          proteins: 35
        }
      ]
    }
  })
  findByCourse(@Param('courseId') courseId: string) {
    return this.mealsService.findByCourse(courseId);
  }

  @Get('calories/:min/:max')
  @ApiOperation({ 
    summary: 'Поиск планов питания по калорийности',
    description: 'Возвращает планы питания в заданном диапазоне калорий.'
  })
  @ApiParam({ name: 'min', description: 'Минимальная калорийность', example: 300 })
  @ApiParam({ name: 'max', description: 'Максимальная калорийность', example: 500 })
  @ApiQuery({ name: 'courseId', required: false, description: 'ID курса для фильтрации', example: '507f1f77bcf86cd799439012' })
  @ApiResponse({ 
    status: 200, 
    description: 'Планы питания по калорийности найдены'
  })
  findByCalorieRange(
    @Param('min') min: string,
    @Param('max') max: string,
    @Query('courseId') courseId?: string
  ) {
    return this.mealsService.findByCalorieRange(Number(min), Number(max), courseId);
  }

  @Get('ingredients')
  @ApiOperation({ 
    summary: 'Поиск планов питания по ингредиентам',
    description: 'Возвращает планы питания, содержащие указанные ингредиенты.'
  })
  @ApiQuery({ name: 'ingredients', required: true, description: 'Список ингредиентов через запятую', example: 'овсянка,молоко,банан' })
  @ApiQuery({ name: 'courseId', required: false, description: 'ID курса для фильтрации', example: '507f1f77bcf86cd799439012' })
  @ApiResponse({ 
    status: 200, 
    description: 'Планы питания по ингредиентам найдены'
  })
  searchByIngredients(
    @Query('ingredients') ingredients: string,
    @Query('courseId') courseId?: string
  ) {
    const ingredientsList = ingredients.split(',').map(i => i.trim());
    return this.mealsService.searchByIngredients(ingredientsList, courseId);
  }

  @Get('nutrition')
  @ApiOperation({ 
    summary: 'Поиск планов питания по питательной ценности',
    description: 'Возвращает планы питания, соответствующие заданным критериям питательной ценности.'
  })
  @ApiQuery({ name: 'minProteins', required: false, description: 'Минимальное количество белков', example: 20 })
  @ApiQuery({ name: 'maxProteins', required: false, description: 'Максимальное количество белков', example: 40 })
  @ApiQuery({ name: 'minFats', required: false, description: 'Минимальное количество жиров', example: 10 })
  @ApiQuery({ name: 'maxFats', required: false, description: 'Максимальное количество жиров', example: 20 })
  @ApiQuery({ name: 'minCarbohydrates', required: false, description: 'Минимальное количество углеводов', example: 30 })
  @ApiQuery({ name: 'maxCarbohydrates', required: false, description: 'Максимальное количество углеводов', example: 60 })
  @ApiQuery({ name: 'courseId', required: false, description: 'ID курса для фильтрации', example: '507f1f77bcf86cd799439012' })
  @ApiResponse({ 
    status: 200, 
    description: 'Планы питания по питательной ценности найдены'
  })
  getMealsByNutrition(
    @Query() nutrition: {
      minProteins?: string;
      maxProteins?: string;
      minFats?: string;
      maxFats?: string;
      minCarbohydrates?: string;
      maxCarbohydrates?: string;
    },
    @Query('courseId') courseId?: string
  ) {
    const nutritionParams = {
      minProteins: nutrition.minProteins ? Number(nutrition.minProteins) : undefined,
      maxProteins: nutrition.maxProteins ? Number(nutrition.maxProteins) : undefined,
      minFats: nutrition.minFats ? Number(nutrition.minFats) : undefined,
      maxFats: nutrition.maxFats ? Number(nutrition.maxFats) : undefined,
      minCarbohydrates: nutrition.minCarbohydrates ? Number(nutrition.minCarbohydrates) : undefined,
      maxCarbohydrates: nutrition.maxCarbohydrates ? Number(nutrition.maxCarbohydrates) : undefined,
    };
    return this.mealsService.getMealsByNutrition(nutritionParams, courseId);
  }

  @Get(':id')
  @ApiOperation({ 
    summary: 'Получить план питания по ID',
    description: 'Возвращает детальную информацию о плане питания.'
  })
  @ApiParam({ name: 'id', description: 'ID плана питания', example: '507f1f77bcf86cd799439011' })
  @ApiResponse({ 
    status: 200, 
    description: 'План питания найден',
    schema: {
      example: {
        _id: '507f1f77bcf86cd799439011',
        name: 'Завтрак для похудения',
        description: 'Сбалансированный завтрак с высоким содержанием белка и клетчатки',
        calories: 350,
        proteins: 25,
        fats: 12,
        carbohydrates: 45,
        fiber: 8,
        sugar: 15,
        sodium: 450,
        image: 'https://uploadthings.io/images/breakfast-bowl.jpg',
        recipe: '1. Смешайте овсянку с молоком...',
        preparationTime: 15,
        difficulty: 'easy',
        ingredients: [
          { name: 'Овсянка', amount: 50, unit: 'г' },
          { name: 'Молоко', amount: 200, unit: 'мл' },
          { name: 'Банан', amount: 1, unit: 'шт' }
        ],
        dietaryRestrictions: ['vegetarian', 'gluten-free'],
        courseId: {
          _id: '507f1f77bcf86cd799439012',
          title: 'Основы здорового питания',
          slug: 'osnovy-zdorovogo-pitaniya'
        }
      }
    }
  })
  @ApiResponse({ status: 404, description: 'План питания не найден' })
  findOne(@Param('id') id: string) {
    return this.mealsService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.MODERATOR, UserRole.ADMIN, UserRole.SUPERADMIN)
  @ApiBearerAuth()
  @ApiOperation({ 
    summary: 'Обновить план питания',
    description: 'Обновляет существующий план питания.'
  })
  @ApiParam({ name: 'id', description: 'ID плана питания', example: '507f1f77bcf86cd799439011' })
  @ApiResponse({ 
    status: 200, 
    description: 'План питания успешно обновлен'
  })
  @ApiResponse({ status: 400, description: 'Неверные данные' })
  @ApiResponse({ status: 404, description: 'План питания не найден' })
  update(@Param('id') id: string, @Body() updateMealDto: UpdateMealDto) {
    return this.mealsService.update(id, updateMealDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.SUPERADMIN)
  @ApiBearerAuth()
  @ApiOperation({ 
    summary: 'Удалить план питания',
    description: 'Удаляет план питания. Операция необратима!'
  })
  @ApiParam({ name: 'id', description: 'ID плана питания', example: '507f1f77bcf86cd799439011' })
  @ApiResponse({ status: 200, description: 'План питания успешно удален' })
  @ApiResponse({ status: 404, description: 'План питания не найден' })
  remove(@Param('id') id: string) {
    return this.mealsService.remove(id);
  }
} 