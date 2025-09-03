"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const app_module_1 = require("./app.module");
const mongo_exception_filter_1 = require("./common/filters/mongo-exception.filter");
const helmet_1 = require("helmet");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.use((0, helmet_1.default)({
        contentSecurityPolicy: process.env.NODE_ENV === 'production' ? undefined : false,
        crossOriginEmbedderPolicy: false,
    }));
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true
    }));
    app.useGlobalFilters(new mongo_exception_filter_1.MongoExceptionFilter());
    app.enableCors({
        origin: process.env.NODE_ENV === 'production'
            ? ['https://yourdomain.com', 'https://app.yourdomain.com']
            : ['http://localhost:3000', 'http://localhost:3001', 'http://localhost:8080'],
        methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
        credentials: true,
    });
    if (process.env.NODE_ENV !== 'production') {
        const config = new swagger_1.DocumentBuilder()
            .setTitle('Online Courses Platform API')
            .setDescription(`
      ## Описание API

      **Платформа для онлайн-курсов** - это комплексная система управления образовательным контентом, 
      разработанная для индивидуальных клиентских решений. Каждый клиент получает отдельную платформу 
      для своих курсов.

      ### Основные возможности:
      - 🏢 **Мультитенантность**: Каждая компания имеет изолированную среду
      - 👥 **Управление пользователями**: Роли, права доступа, профили
      - 📚 **Курсы и модули**: Структурированный образовательный контент
      - 💰 **Тарифы и покупки**: Гибкая система монетизации
      - 📊 **Отслеживание прогресса**: Мониторинг обучения пользователей
      - 🍽️ **Планы питания**: Для фитнес и wellness курсов

      ### Технологии:
      - **Backend**: NestJS, MongoDB, Mongoose
      - **Аутентификация**: JWT, Passport (Local, Google, Facebook)
      - **Платежи**: Stripe, WayForPay
      - **Файлы**: UploadThings, Bunny.net (видео)
      - **Email**: SendPulse

      ### Роли пользователей:
      - **Student**: Базовый доступ к курсам
      - **Moderator**: Редактирование контента
      - **Admin**: Управление компанией
      - **Superadmin**: Системные права

      ### Аутентификация:
      API использует Bearer токены. Получите токен через эндпоинт /auth/login или /auth/register.
    `)
            .setVersion('1.0.0')
            .addTag('auth', 'Аутентификация и авторизация пользователей')
            .addTag('users', 'Управление пользователями системы')
            .addTag('companies', 'Управление компаниями и мультитенантность')
            .addTag('courses', 'Создание и управление курсами')
            .addTag('course-modules', 'Модули курсов и их структура')
            .addTag('lessons', 'Уроки и образовательный контент')
            .addTag('tariffs', 'Тарифы и ценообразование курсов')
            .addTag('meals', 'Планы питания для wellness курсов')
            .addTag('user-progress', 'Отслеживание прогресса обучения')
            .addTag('purchases', 'Покупки курсов и управление доступом')
            .addBearerAuth({
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT',
            name: 'JWT',
            description: 'Введите JWT токен',
            in: 'header',
        }, 'JWT-auth')
            .addServer('http://localhost:3000', 'Локальная среда разработки')
            .addServer('https://api.example.com', 'Продакшн сервер')
            .build();
        const document = swagger_1.SwaggerModule.createDocument(app, config);
        swagger_1.SwaggerModule.setup('api', app, document, {
            swaggerOptions: {
                persistAuthorization: true,
                docExpansion: 'list',
                filter: true,
                showRequestDuration: true,
                tryItOutEnabled: true,
            },
            customSiteTitle: 'Online Courses Platform API',
            customCss: `
      .swagger-ui .topbar { display: none }
      .swagger-ui .info .title { font-size: 2.5em; color: #3b82f6; }
      .swagger-ui .info .description { font-size: 1.1em; line-height: 1.6; }
      .swagger-ui .info .description h3 { color: #1f2937; margin-top: 1.5em; }
      .swagger-ui .info .description ul { margin-left: 1.5em; }
      .swagger-ui .info .description li { margin-bottom: 0.5em; }
      .swagger-ui .scheme-container { background: #f8fafc; padding: 1em; border-radius: 0.5em; }
      .swagger-ui .scheme-container .schemes-title { font-weight: bold; color: #374151; }
      .swagger-ui .scheme-container .schemes-container { margin-top: 0.5em; }
      .swagger-ui .scheme-container .schemes-container button { 
        background: #3b82f6; 
        color: white; 
        border: none; 
        padding: 0.5em 1em; 
        border-radius: 0.25em; 
        cursor: pointer; 
      }
      .swagger-ui .scheme-container .schemes-container button:hover { background: #2563eb; }
    `,
        });
    }
    const port = process.env.PORT || 3000;
    await app.listen(port);
    console.log(`🚀 Приложение запущено на порту ${port}`);
    if (process.env.NODE_ENV !== 'production') {
        console.log(`📚 Swagger документация доступна по адресу: http://localhost:${port}/api`);
    }
    console.log(`🌐 API доступен по адресу: http://localhost:${port}`);
}
bootstrap();
//# sourceMappingURL=main.js.map