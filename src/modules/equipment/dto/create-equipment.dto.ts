import { IsString, IsOptional, IsBoolean, IsUrl, MaxLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateEquipmentDto {
  @ApiProperty({ 
    description: 'Название инвентаря/оборудования',
    example: 'Гантели 5 кг',
    maxLength: 100
  })
  @IsString()
  @MaxLength(100)
  name: string;

  @ApiPropertyOptional({ 
    description: 'URL иконки инвентаря',
    example: 'https://uploadthings.io/icons/dumbbell.svg',
    format: 'uri'
  })
  @IsOptional()
  @IsString()
  @IsUrl()
  icon?: string;

  @ApiPropertyOptional({ 
    description: 'Описание инвентаря',
    example: 'Универсальные гантели для домашних тренировок',
    maxLength: 500
  })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  description?: string;

  @ApiPropertyOptional({ 
    description: 'Активен ли инвентарь',
    example: true,
    default: true
  })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
