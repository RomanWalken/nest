import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Глобальная валидация
  app.useGlobalPipes(new ValidationPipe({ 
    whitelist: true, 
    forbidNonWhitelisted: true, 
    transform: true 
  }));
  
  // Включение CORS
  app.enableCors();
  app.enableCors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  });
  
  // Конфигурация Swagger
  const config = new DocumentBuilder()
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
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Введите JWT токен',
        in: 'header',
      },
      'JWT-auth', // Это имя для ссылки на схему
    )
    .addServer('http://localhost:3000', 'Локальная среда разработки')
    .addServer('https://api.example.com', 'Продакшн сервер')
    .build();
  
  const document = SwaggerModule.createDocument(app, config);
  
  // Настройка Swagger UI
  SwaggerModule.setup('api', app, document, {
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