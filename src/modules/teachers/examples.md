# Примеры использования API преподавателей

## Создание преподавателя

### Запрос
```bash
curl -X POST http://localhost:3000/teachers \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "anna.petrova@fitness.com",
    "password": "SecurePass123!",
    "firstName": "Анна",
    "lastName": "Петрова",
    "companyId": "507f1f77bcf86cd799439011",
    "specialization": "Фитнес-тренер",
    "skills": ["персональные тренировки", "групповые занятия", "йога"],
    "experience": 5,
    "bio": "Опытный фитнес-тренер с 5-летним стажем работы. Специализируюсь на персональных тренировках и групповых занятиях.",
    "languages": ["русский", "английский"],
    "schedule": {
      "monday": {"start": "09:00", "end": "18:00"},
      "tuesday": {"start": "09:00", "end": "18:00"},
      "wednesday": {"start": "09:00", "end": "18:00"},
      "thursday": {"start": "09:00", "end": "18:00"},
      "friday": {"start": "09:00", "end": "18:00"}
    },
    "profile": {
      "education": "Киевский национальный университет физического воспитания и спорта",
      "achievements": ["Победитель конкурса \"Лучший тренер года 2023\""],
      "socialLinks": {
        "instagram": "@anna_fitness",
        "linkedin": "linkedin.com/in/annapetrova"
      }
    }
  }'
```

### Ответ
```json
{
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "email": "anna.petrova@fitness.com",
    "firstName": "Анна",
    "lastName": "Петрова",
    "specialization": "Фитнес-тренер",
    "skills": ["персональные тренировки", "групповые занятия", "йога"],
    "experience": 5,
    "role": "teacher",
    "companyId": "507f1f77bcf86cd799439011",
    "isActive": true,
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

## Получение списка преподавателей

### Запрос с фильтрацией
```bash
curl -X GET "http://localhost:3000/teachers?page=1&limit=10&search=Анна&specialization=Фитнес-тренер&skills=йога&isActive=true" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### Ответ
```json
{
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "firstName": "Анна",
      "lastName": "Петрова",
      "email": "anna.petrova@fitness.com",
      "specialization": "Фитнес-тренер",
      "skills": ["персональные тренировки", "групповые занятия", "йога"],
      "experience": 5,
      "isActive": true,
      "companyId": {
        "_id": "507f1f77bcf86cd799439011",
        "name": "Fitness Studio Pro"
      }
    }
  ],
  "meta": {
    "page": 1,
    "limit": 10,
    "total": 1,
    "totalPages": 1
  }
}
```

## Поиск преподавателей по специализации

### Запрос
```bash
curl -X GET "http://localhost:3000/teachers/specialization/Фитнес-тренер?companyId=507f1f77bcf86cd799439011" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### Ответ
```json
[
  {
    "_id": "507f1f77bcf86cd799439011",
    "firstName": "Анна",
    "lastName": "Петрова",
    "specialization": "Фитнес-тренер",
    "skills": ["персональные тренировки", "групповые занятия", "йога"],
    "experience": 5,
    "bio": "Опытный фитнес-тренер с 5-летним стажем работы..."
  }
]
```

## Обновление преподавателя

### Запрос
```bash
curl -X PATCH http://localhost:3000/teachers/507f1f77bcf86cd799439011 \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "experience": 6,
    "skills": ["персональные тренировки", "групповые занятия", "йога", "пилатес"],
    "bio": "Опытный фитнес-тренер с 6-летним стажем работы. Специализируюсь на персональных тренировках, групповых занятиях, йоге и пилатесе."
  }'
```

### Ответ
```json
{
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "firstName": "Анна",
    "lastName": "Петрова",
    "specialization": "Фитнес-тренер",
    "skills": ["персональные тренировки", "групповые занятия", "йога", "пилатес"],
    "experience": 6,
    "bio": "Опытный фитнес-тренер с 6-летним стажем работы. Специализируюсь на персональных тренировках, групповых занятиях, йоге и пилатесе.",
    "updatedAt": "2024-01-01T12:00:00.000Z"
  }
}
```

## Добавление курса преподавателю

### Запрос
```bash
curl -X POST http://localhost:3000/teachers/507f1f77bcf86cd799439011/courses/507f1f77bcf86cd799439013 \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### Ответ
```json
{
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "firstName": "Анна",
    "lastName": "Петрова",
    "courses": [
      {
        "_id": "507f1f77bcf86cd799439013",
        "title": "Основы фитнеса для начинающих"
      }
    ]
  }
}
```

## Удаление преподавателя

### Запрос
```bash
curl -X DELETE http://localhost:3000/teachers/507f1f77bcf86cd799439011 \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### Ответ
```json
{
  "message": "Преподаватель успешно удален"
}
```

## Обработка ошибок

### Недостаточно прав
```json
{
  "statusCode": 403,
  "message": "Недостаточно прав для создания преподавателя",
  "error": "Forbidden"
}
```

### Преподаватель не найден
```json
{
  "statusCode": 404,
  "message": "Преподаватель не найден",
  "error": "Not Found"
}
```

### Неверные данные
```json
{
  "statusCode": 400,
  "message": "Преподаватель с таким email уже существует в данной компании",
  "error": "Bad Request"
}
```

## JavaScript/TypeScript примеры

### Создание преподавателя
```typescript
import axios from 'axios';

const createTeacher = async (teacherData: CreateTeacherDto) => {
  try {
    const response = await axios.post('/teachers', teacherData, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Ошибка при создании преподавателя:', error.response.data);
    throw error;
  }
};

// Использование
const newTeacher = await createTeacher({
  email: 'teacher@example.com',
  password: 'SecurePass123!',
  firstName: 'Анна',
  lastName: 'Петрова',
  companyId: '507f1f77bcf86cd799439011',
  specialization: 'Фитнес-тренер'
});
```

### Поиск преподавателей
```typescript
const searchTeachers = async (filters: QueryTeacherDto) => {
  const params = new URLSearchParams();
  
  if (filters.search) params.append('search', filters.search);
  if (filters.specialization) params.append('specialization', filters.specialization);
  if (filters.page) params.append('page', filters.page.toString());
  if (filters.limit) params.append('limit', filters.limit.toString());
  
  const response = await axios.get(`/teachers?${params.toString()}`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  
  return response.data;
};
```
