import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { MongoError } from 'mongodb';
import { Error } from 'mongoose';

@Catch(MongoError, Error.CastError, Error.ValidationError)
export class MongoExceptionFilter implements ExceptionFilter {
  catch(exception: MongoError | Error.CastError | Error.ValidationError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Внутренняя ошибка сервера';
    let details = null;

    if (exception instanceof Error.CastError) {
      // Ошибка приведения типов (например, невалидный ObjectId)
      status = HttpStatus.BAD_REQUEST;
      message = `Ошибка приведения типов: ${exception.message}`;
      details = {
        field: exception.path,
        value: exception.value,
        expectedType: exception.kind,
      };
    } else if (exception instanceof Error.ValidationError) {
      // Ошибка валидации Mongoose
      status = HttpStatus.BAD_REQUEST;
      message = 'Ошибка валидации данных';
      details = Object.keys(exception.errors).map(key => ({
        field: key,
        message: exception.errors[key].message,
        value: exception.errors[key].value,
      }));
    } else if (exception instanceof MongoError) {
      // Общие ошибки MongoDB
      switch (exception.code) {
        case 11000: // Дублирование ключа
          status = HttpStatus.CONFLICT;
          message = 'Запись с такими данными уже существует';
          details = {
            field: Object.keys((exception as any).keyPattern || {}),
            duplicateValue: (exception as any).keyValue,
          };
          break;
        case 121: // Ошибка валидации документа
          status = HttpStatus.BAD_REQUEST;
          message = 'Ошибка валидации документа';
          break;
        default:
          status = HttpStatus.INTERNAL_SERVER_ERROR;
          message = 'Ошибка базы данных';
          details = {
            code: exception.code,
            message: exception.message,
          };
      }
    }

    const errorResponse = {
      statusCode: status,
      message,
      error: 'MongoDB Error',
      timestamp: new Date().toISOString(),
      path: ctx.getRequest().url,
      details,
    };

    response.status(status).json(errorResponse);
  }
}
