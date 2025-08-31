# Структура курсов в системе

## Обзор

Система курсов была переработана для четкого разделения на **виды** и **категории** курсов, что позволяет более гибко управлять контентом и функциональностью.

## Виды курсов (CourseKind)

### 1. REGULAR - Обычный курс
- **Описание**: Стандартные курсы (видео, кулинария, программирование и т.д.)
- **Структура**: Курс → Модули → Уроки
- **Контент**: Видео, текст, презентации, опросы (в уроках)
- **Ограничения**: Не может содержать `meals`, `teachers` и `workouts`

### 2. FITNESS - Фитнес курс
- **Описание**: Специальные курсы для фитнеса и здорового образа жизни
- **Структура**: Курс → Workouts → Exercises
- **Контент**: Тренировки, упражнения, планы питания
- **Ограничения**: Не может содержать `modules`

## Категории курсов (CourseCategory)

### Для обычных курсов (REGULAR):
- `VIDEO` - Видео курс
- `COOKING` - Кулинария
- `PROGRAMMING` - Программирование
- `DESIGN` - Дизайн
- `BUSINESS` - Бизнес
- `LANGUAGE` - Языки
- `MUSIC` - Музыка
- `ART` - Искусство
- `CUSTOM` - Пользовательская категория

### Для фитнес-курсов (FITNESS):
- `FITNESS_TRAINING` - Фитнес тренировки
- `YOGA` - Йога
- `PILATES` - Пилатес
- `NUTRITION` - Питание
- `WELLNESS` - Здоровье и благополучие

## Статусы публикации курсов

- `DRAFT` - Черновик (виден только авторам и модераторам)
- `COMING_SOON` - Скоро в продаже (виден всем, но недоступен для покупки)
- `PUBLISHED` - Опубликовано (полностью доступен)

## Структура данных

### Базовая схема курса
```typescript
{
  title: string;                    // Название курса
  slug: string;                     // URL-идентификатор
  description?: string;             // Описание
  kind: CourseKind;                 // Вид курса (REGULAR/FITNESS)
  category: CourseCategory;         // Категория курса
  thumbnail?: string;               // Превью
  duration: number;                 // Продолжительность в минутах
  difficulty: DifficultyLevel;      // Уровень сложности
  publicationStatus: CoursePublicationStatus; // Статус публикации
  isFeatured: boolean;              // Рекомендуемый курс
  isPaid: boolean;                  // Платный или бесплатный
  companyId: ObjectId;              // ID компании
  authorId: ObjectId;               // ID автора
  tags: string[];                   // Теги
  metadata: Record<string, any>;    // Дополнительные данные
}
```

### Специфичные поля для фитнес-курсов
```typescript
{
  meals: ObjectId[];                // Ссылки на приемы пищи
  teachers: ObjectId[];             // Ссылки на преподавателей
  workouts: ObjectId[];             // Ссылки на тренировки
  hasMeals: boolean;                // Будет ли у курса meals
  hasDoctor: boolean;               // Будет ли у курса доктор
}
```

### Специфичные поля для обычных курсов
```typescript
{
  modules: ObjectId[];              // Ссылки на модули
}
```

## Структура контента

### Обычные курсы (REGULAR)
```
Курс
├── Модули (Modules)
│   ├── Урок 1 (Lesson)
│   │   ├── Видео (videoUrl)
│   │   ├── Текст (content)
│   │   ├── Файлы (attachments)
│   │   └── Тарифы (tariffs)
│   ├── Урок 2 (Lesson)
│   └── ...
└── ...
```

### Фитнес курсы (FITNESS)
```
Курс
├── Workouts (Тренировки)
│   ├── Exercise 1 (Упражнение)
│   │   ├── Видео (videoUrl)
│   │   ├── Повторения (repetitions)
│   │   ├── Оборудование (equipment)
│   │   ├── Целевые мускулы (targetMuscles)
│   │   └── Тарифы (tariffs)
│   ├── Exercise 2 (Упражнение)
│   └── ...
├── Meals (Планы питания)
│   ├── Категория питания (dietaryCategory)
│   ├── Пищевая ценность
│   └── Тарифы (tariffs)
└── Teachers (Преподаватели)
```

## Валидация

### При создании курса
- Фитнес-курсы не могут содержать `modules`
- Обычные курсы не могут содержать `meals`, `teachers` и `workouts`
- Каждая категория должна соответствовать выбранному виду

### При обновлении курса
- При смене вида курса автоматически очищаются несовместимые поля
- Проверяется соответствие категории новому виду

## API Endpoints

### Основные операции
- `POST /courses` - Создание курса
- `GET /courses` - Список курсов (с фильтрацией по виду)
- `GET /courses/fitness` - Только фитнес-курсы
- `GET /courses/regular` - Только обычные курсы
- `GET /courses/category/:category` - Курсы по категории
- `GET /courses/published` - Только опубликованные курсы
- `GET /courses/:id` - Курс по ID
- `PATCH /courses/:id` - Обновление курса
- `DELETE /courses/:id` - Удаление курса

### Управление связями (только для фитнес-курсов)
- `POST /courses/:id/meals/:mealId` - Добавить прием пищи
- `DELETE /courses/:id/meals/:mealId` - Убрать прием пищи
- `POST /courses/:id/teachers/:teacherId` - Добавить преподавателя
- `DELETE /courses/:id/teachers/:teacherId` - Убрать преподавателя

## Примеры использования

### Создание фитнес-курса
```json
{
  "title": "Основы фитнеса для начинающих",
  "slug": "osnovy-fitnesa-dlya-nachinayushchih",
  "description": "Комплексный курс по фитнесу...",
  "kind": "fitness",
  "category": "fitness_training",
  "difficulty": "beginner",
  "publicationStatus": "draft",
  "isPaid": true,
  "hasMeals": true,
  "hasDoctor": false
}
```

### Создание обычного курса
```json
{
  "title": "Основы программирования на Python",
  "slug": "osnovy-programmirovaniya-python",
  "description": "Курс для начинающих программистов...",
  "kind": "regular",
  "category": "programming",
  "difficulty": "beginner",
  "publicationStatus": "draft",
  "isPaid": false
}
```

## Миграция существующих данных

При обновлении системы существующие курсы с полем `isPublished: boolean` должны быть преобразованы в `publicStatus: CoursePublicationStatus`.

## Преимущества новой структуры

1. **Четкое разделение**: Фитнес и обычные курсы имеют разные поля и функциональность
2. **Логическая структура**: Видео и файлы находятся в уроках, где они логически уместны
3. **Гибкость**: Каждый вид может иметь множество категорий
4. **Валидация**: Автоматическая проверка совместимости полей
5. **Масштабируемость**: Легко добавлять новые категории и виды
6. **Производительность**: Оптимизированные запросы для каждого вида курсов
