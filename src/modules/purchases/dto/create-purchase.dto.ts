import { IsString, IsNumber, IsEnum, IsOptional, Min, Max } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { PaymentMethod } from '@/common/types';

export class CreatePurchaseDto {
  @ApiProperty({ 
    description: 'ID курса для покупки',
    example: '507f1f77bcf86cd799439011'
  })
  @IsString()
  courseId: string;

  @ApiProperty({ 
    description: 'ID тарифа, по которому совершается покупка',
    example: '507f1f77bcf86cd799439012'
  })
  @IsString()
  tariffId: string;

  @ApiProperty({ 
    description: 'Сумма покупки в указанной валюте',
    example: 29.99,
    minimum: 0,
    maximum: 9999.99
  })
  @IsNumber()
  @Min(0)
  @Max(9999.99)
  amount: number;

  @ApiProperty({ 
    description: 'Валюта покупки',
    example: 'USD',
    enum: ['USD', 'EUR', 'UAH', 'RUB']
  })
  @IsString()
  currency: string;

  @ApiProperty({ 
    description: 'Метод оплаты (wayforpay - украинская система, stripe - международная система)',
    enum: PaymentMethod,
    example: PaymentMethod.STRIPE
  })
  @IsEnum(PaymentMethod)
  paymentMethod: PaymentMethod;

  @ApiPropertyOptional({ 
    description: 'Длительность тарифа в днях для расчета срока действия доступа (используется для автоматического расчета accessExpiresAt)',
    example: 30,
    minimum: 0,
    maximum: 3650
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(3650)
  tariffDuration?: number;

  @ApiPropertyOptional({ 
    description: 'ID транзакции от платежной системы (может быть предоставлен сразу или позже при подтверждении платежа)',
    example: 'txn_1234567890abcdef'
  })
  @IsOptional()
  @IsString()
  transactionId?: string;
} 