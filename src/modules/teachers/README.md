# Модуль Преподавателей (Teachers)

Модуль для управления преподавателями в системе онлайн-курсов.

## Описание

Модуль преподавателей предоставляет полный CRUD функционал для работы с преподавателями. Преподаватели могут быть созданы только администраторами и выше, и привязаны к конкретным компаниям.

## Роли и права доступа

- **ADMIN, SUPERADMIN**: Полный доступ ко всем операциям
- **TEACHER, MODERATOR, STUDENT**: Только чтение данных преподавателей своей компании

## API Endpoints

### Создание преподавателя
```
POST /teachers
```
**Доступ**: ADMIN, SUPERADMIN

Создает нового преподавателя в системе.

**Тело запроса:**
```json
{
  "email": "teacher@example.com",
  "password": "SecurePass123!",
  "firstName": "Анна",
  "lastName": "Петрова",
  "companyId": "507f1f77bcf86cd799439012",
  "specialization": "Фитнес-тренер",
  "skills": ["персональные тренировки", "групповые занятия"],
  "experience": 5,
  "bio": "Опытный фитнес-тренер с 5-летним стажем",
  "languages": ["русский", "английский"]
}
```

### Получение списка преподавателей
```
GET /teachers?page=1&limit=10&search=Анна&specialization=Фитнес-тренер
```
**Доступ**: Все авторизованные пользователи

**Параметры запроса:**
- `page` - номер страницы (по умолчанию: 1)
- `limit` - количество элементов на странице (по умолчанию: 10)
- `search` - поиск по имени, фамилии или email
- `specialization` - фильтр по специализации
- `skills` - фильтр по навыкам (массив)
- `companyId` - фильтр по компании
- `isActive` - фильтр по статусу активности
- `languages` - фильтр по языкам (массив)

### Получение преподавателя по ID
```
GET /teachers/:id
```
**Доступ**: Все авторизованные пользователи

### Получение преподавателей по компании
```
GET /teachers/company/:companyId
```
**Доступ**: Все авторизованные пользователи

### Поиск преподавателей по специализации
```
GET /teachers/specialization/:specialization?companyId=507f1f77bcf86cd799439012
```
**Доступ**: Все авторизованные пользователи

### Обновление преподавателя
```
PATCH /teachers/:id
```
**Доступ**: ADMIN, SUPERADMIN

### Удаление преподавателя
```
DELETE /teachers/:id
```
**Доступ**: ADMIN, SUPERADMIN

### Добавление курса преподавателю
```
POST /teachers/:id/courses/:courseId
```
**Доступ**: ADMIN, SUPERADMIN

### Удаление курса у преподавателя
```
DELETE /teachers/:id/courses/:courseId
```
**Доступ**: ADMIN, SUPERADMIN

## Модель данных

### Teacher Schema

```typescript
{
  email: string;                    // Email (уникальный в рамках компании)
  password: string;                 // Хешированный пароль
  firstName: string;                // Имя
  lastName: string;                 // Фамилия
  avatar?: string;                  // URL аватара
  phone?: string;                   // Номер телефона
  role: UserRole;                   // Роль (всегда 'teacher')
  companyId: ObjectId;              // ID компании (обязательно)
  isActive: boolean;                // Статус активности
  emailVerified: boolean;           // Подтверждение email
  authProviders: string[];          // Провайдеры аутентификации
  lastLogin?: Date;                 // Последний вход
  specialization: string;           // Специализация (обязательно)
  skills: string[];                 // Навыки
  certificates: string[];           // Сертификаты
  experience?: number;              // Опыт работы в годах
  bio?: string;                     // Биография
  languages: string[];              // Языки преподавания
  schedule: Record<string, any>;    // Расписание работы
  courses: ObjectId[];              // Список курсов
  profile: Record<string, any>;     // Дополнительные данные профиля
  createdAt: Date;                  // Дата создания
  updatedAt: Date;                  // Дата обновления
}
```

## Особенности

1. **Безопасность**: Пароли автоматически хешируются с помощью bcrypt
2. **Валидация**: Все входящие данные валидируются с помощью class-validator
3. **Авторизация**: Используется JWT аутентификация и проверка ролей
4. **Изоляция данных**: Обычные пользователи видят только преподавателей своей компании
5. **Поиск и фильтрация**: Поддерживается полнотекстовый поиск и множественная фильтрация
6. **Пагинация**: Все списки поддерживают пагинацию
7. **Связи**: Автоматическое заполнение связанных данных (компания, курсы)

## Интеграция

Модуль интегрирован в основное приложение через `app.module.ts` и может быть использован другими модулями через `TeachersService`.

## Примеры использования

### Создание преподавателя (только для админов)
```typescript
const teacher = await teachersService.create({
  email: 'teacher@example.com',
  password: 'SecurePass123!',
  firstName: 'Анна',
  lastName: 'Петрова',
  companyId: '507f1f77bcf86cd799439012',
  specialization: 'Фитнес-тренер',
  skills: ['персональные тренировки', 'групповые занятия'],
  experience: 5
});
```

### Поиск преподавателей по специализации
```typescript
const fitnessTeachers = await teachersService.findBySpecialization('Фитнес-тренер');
```

### Добавление курса преподавателю
```typescript
await teachersService.addCourse(teacherId, courseId);
```
