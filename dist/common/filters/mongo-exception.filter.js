"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongoExceptionFilter = void 0;
const common_1 = require("@nestjs/common");
const mongodb_1 = require("mongodb");
const mongoose_1 = require("mongoose");
let MongoExceptionFilter = class MongoExceptionFilter {
    catch(exception, host) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        let status = common_1.HttpStatus.INTERNAL_SERVER_ERROR;
        let message = 'Внутренняя ошибка сервера';
        let details = null;
        if (exception instanceof mongoose_1.Error.CastError) {
            status = common_1.HttpStatus.BAD_REQUEST;
            message = `Ошибка приведения типов: ${exception.message}`;
            details = {
                field: exception.path,
                value: exception.value,
                expectedType: exception.kind,
            };
        }
        else if (exception instanceof mongoose_1.Error.ValidationError) {
            status = common_1.HttpStatus.BAD_REQUEST;
            message = 'Ошибка валидации данных';
            details = Object.keys(exception.errors).map(key => ({
                field: key,
                message: exception.errors[key].message,
                value: exception.errors[key].value,
            }));
        }
        else if (exception instanceof mongodb_1.MongoError) {
            switch (exception.code) {
                case 11000:
                    status = common_1.HttpStatus.CONFLICT;
                    message = 'Запись с такими данными уже существует';
                    details = {
                        field: Object.keys(exception.keyPattern || {}),
                        duplicateValue: exception.keyValue,
                    };
                    break;
                case 121:
                    status = common_1.HttpStatus.BAD_REQUEST;
                    message = 'Ошибка валидации документа';
                    break;
                default:
                    status = common_1.HttpStatus.INTERNAL_SERVER_ERROR;
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
};
exports.MongoExceptionFilter = MongoExceptionFilter;
exports.MongoExceptionFilter = MongoExceptionFilter = __decorate([
    (0, common_1.Catch)(mongodb_1.MongoError, mongoose_1.Error.CastError, mongoose_1.Error.ValidationError)
], MongoExceptionFilter);
//# sourceMappingURL=mongo-exception.filter.js.map