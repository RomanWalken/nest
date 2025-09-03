import { IsOptional, IsString, IsBoolean, IsArray } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { PaginationDto } from '@/common/types';

export class QueryTeacherDto implements PaginationDto {
  @ApiPropertyOptional({ 
    description: 'Номер страницы',
    example: 1,
    minimum: 1
  })
  page?: number;

  @ApiPropertyOptional({ 
    description: 'Количество элементов на странице',
    example: 10,
    minimum: 1,
    maximum: 100
  })
  limit?: number;

  @ApiPropertyOptional({ 
    description: 'Поиск по имени, фамилии или email',
    example: 'Анна'
  })
  @IsOptional()
  @IsString()
  search?: string;

  @ApiPropertyOptional({ 
    description: 'Фильтр по специализации',
    example: 'Фитнес-тренер'
  })
  @IsOptional()
  @IsString()
  specialization?: string;

  @ApiPropertyOptional({ 
    description: 'Фильтр по навыкам',
    example: ['йога', 'пилатес']
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  skills?: string[];

  @ApiPropertyOptional({ 
    description: 'Фильтр по статусу активности',
    example: true
  })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @ApiPropertyOptional({ 
    description: 'Фильтр по языкам',
    example: ['русский', 'английский']
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  languages?: string[];
}
