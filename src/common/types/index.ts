export enum UserRole {
  STUDENT = 'student',
  TEACHER = 'teacher',
  MODERATOR = 'moderator',
  ADMIN = 'admin',
  SUPERADMIN = 'superadmin',
}

export enum CourseKind {
  REGULAR = 'regular',    // Обычный курс (видео, кулинария, программирование и т.д.)
  FITNESS = 'fitness',    // Фитнес курс (с workouts, exercises и meals)
}

export enum CourseCategory {
  VIDEO = 'video',           // Видео курс
  COOKING = 'cooking',       // Кулинария
  PROGRAMMING = 'programming', // Программирование
  DESIGN = 'design',         // Дизайн
  BUSINESS = 'business',      // Бизнес
  LANGUAGE = 'language',     // Языки
  MUSIC = 'music',           // Музыка
  ART = 'art',               // Искусство
  FITNESS_TRAINING = 'fitness_training', // Фитнес тренировки
  YOGA = 'yoga',             // Йога
  PILATES = 'pilates',       // Пилатес
  NUTRITION = 'nutrition',   // Питание
  WELLNESS = 'wellness',     // Здоровье и благополучие
  CUSTOM = 'custom',         // Пользовательская категория
}

export enum CoursePublicationStatus {
  DRAFT = 'draft',           // Черновик
  COMING_SOON = 'coming_soon', // Скоро в продаже
  PUBLISHED = 'published',   // Опубликовано
}

export enum LessonType {
  VIDEO = 'video',           // Видео урок
  TEXT = 'text',             // Текстовый урок
  PRESENTATION = 'presentation', // Презентация
  QUIZ = 'quiz',             // Опрос
}

export enum DietaryCategory {
  VEGAN = 'vegan',           // Веганы
  VEGETARIAN = 'vegetarian', // Вегетарианцы
  OMNIVORE = 'omnivore',     // Всеядные
  PESCATARIAN = 'pescatarian', // Пескетарианцы
  KETO = 'keto',             // Кето диета
  PALEO = 'paleo',           // Палео диета
  GLUTEN_FREE = 'gluten_free', // Без глютена
  DAIRY_FREE = 'dairy_free', // Без молочных продуктов
  LOW_CARB = 'low_carb',     // Низкоуглеводная
  HIGH_PROTEIN = 'high_protein', // Высокобелковая
}

export enum TariffStatus {
  ACTIVE = 'active',         // Активен
  INACTIVE = 'inactive',     // Неактивен
  SOLD_OUT = 'sold_out',     // Распродан
}

export enum PaymentStatus {
  PENDING = 'pending',
  COMPLETED = 'completed',
  FAILED = 'failed',
}

export enum PaymentMethod {
  WAYFORPAY = 'wayforpay',
  STRIPE = 'stripe',
}

export enum DifficultyLevel {
  BEGINNER = 'beginner',
  INTERMEDIATE = 'intermediate',
  ADVANCED = 'advanced',
}

export interface PaginationDto {
  page?: number;
  limit?: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface ApiResponse<T> {
  data: T;
  meta?: any;
}

export interface ApiError {
  error: string;
  code: number;
  details?: any;
  timestamp: string;
} 