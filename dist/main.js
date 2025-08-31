"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true
    }));
    app.enableCors();
    app.enableCors({
        origin: '*',
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization'],
        credentials: true,
    });
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
    `,
    });
    const port = process.env.PORT || 3000;
    await app.listen(port);
    console.log(`🚀 Приложение запущено на порту ${port}`);
    console.log(`📚 Swagger документация доступна по адресу: http://localhost:${port}/api`);
}
bootstrap();
//# sourceMappingURL=main.js.map