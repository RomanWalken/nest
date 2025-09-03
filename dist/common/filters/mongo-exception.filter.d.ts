import { ExceptionFilter, ArgumentsHost } from '@nestjs/common';
import { MongoError } from 'mongodb';
import { Error } from 'mongoose';
export declare class MongoExceptionFilter implements ExceptionFilter {
    catch(exception: MongoError | Error.CastError | Error.ValidationError, host: ArgumentsHost): void;
}
