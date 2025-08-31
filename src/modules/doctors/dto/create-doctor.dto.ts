import { IsString, IsOptional, IsArray, IsBoolean, IsMongoId } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateDoctorDto {
  @ApiProperty({ 
    description: 'ID пользователя',
    example: '507f1f77bcf86cd799439011'
  })
  @IsString()
  @IsMongoId()
  userId: string;

  @ApiProperty({ 
    description: 'ID курса',
    example: '507f1f77bcf86cd799439012'
  })
  @IsString()
  @IsMongoId()
  courseId: string;

  @ApiPropertyOptional({ 
    description: 'Файлы, загруженные пользователем',
    example: ['https://uploadthings.io/files/medical-report.pdf'],
    type: [String]
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  userFiles?: string[];

  @ApiPropertyOptional({ 
    description: 'Файлы, загруженные представителем курса',
    example: ['https://uploadthings.io/files/doctor-response.pdf'],
    type: [String]
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  courseFiles?: string[];

  @ApiPropertyOptional({ 
    description: 'Активен ли доктор',
    example: true,
    default: true
  })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @ApiPropertyOptional({ 
    description: 'Дополнительные метаданные',
    example: {
      consultationType: 'online',
      speciality: 'sports_medicine',
      notes: 'Специалист по спортивной медицине'
    }
  })
  @IsOptional()
  metadata?: Record<string, any>;
}
