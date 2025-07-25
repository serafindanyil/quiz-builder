# Quiz Builder Backend API

Backend додаток для створення та управління квізами, розроблений на Node.js з використанням Express.js, TypeScript та Prisma ORM.

## 🚀 Швидкий старт

### Передумови

- Node.js (версія 18+ рекомендується)
- npm або yarn
- SQLite (вбудовано)

### Встановлення

1. Перейдіть до директорії backend:
```bash
cd backend
```

2. Встановіть залежності:
```bash
npm install
# або
yarn install
```

3. Налаштуйте базу даних:
```bash
# Запустіть міграції Prisma
npx prisma migrate dev

# Згенеруйте Prisma Client
npx prisma generate
```

### Запуск сервера

#### Режим розробки (з автоперезавантаженням)
```bash
npm run dev
```

Сервер запуститься на `http://localhost:3000`

#### Перевірка роботи сервера
```bash
curl http://localhost:3000/ping
# Очікувана відповідь: "Pong"
```

## 📊 База даних

Проект використовує SQLite базу даних з наступною структурою:

- **Quiz** - основна таблиця квізів
- **Question** - питання квізу
- **Option** - варіанти відповідей для питань

Підтримувані типи питань:
- `BOOLEAN` - так/ні питання
- `INPUT` - текстові питання
- `CHECKBOX` - питання з множинним вибором

## 🔗 API Ендпоінти

Всі ендпоінти доступні за базовим URL: `http://localhost:3000/api`

### 1. Створити квіз

**POST** `/api/quizzes`

Створює новий квіз з питаннями та варіантами відповідей.

#### Приклад запиту:
```json
{
  "title": "Загальні знання",
  "questions": [
    {
      "text": "Яка столиця України?",
      "type": "CHECKBOX",
      "options": ["Київ", "Львів", "Харків", "Одеса"],
      "correctAnswers": ["Київ"]
    },
    {
      "text": "Україна - це європейська країна?",
      "type": "BOOLEAN", 
      "options": ["Так", "Ні"],
      "correctAnswers": ["Так"]
    },
    {
      "text": "Назвіть найдовшу річку України",
      "type": "INPUT",
      "options": [],
      "correctAnswers": ["Дніпро"]
    }
  ]
}
```

#### Приклад відповіді:
```json
{
  "id": 1,
  "title": "Загальні знання",
  "createdAt": "2025-07-25T16:30:00.000Z",
  "updatedAt": "2025-07-25T16:30:00.000Z",
  "questions": [
    {
      "id": 1,
      "quizId": 1,
      "text": "Яка столиця України?",
      "type": "CHECKBOX",
      "correctAnswer": null,
      "createdAt": "2025-07-25T16:30:00.000Z",
      "options": [
        {
          "id": 1,
          "questionId": 1,
          "text": "Київ",
          "isCorrect": true
        },
        {
          "id": 2,
          "questionId": 1,
          "text": "Львів",
          "isCorrect": false
        },
        {
          "id": 3,
          "questionId": 1,
          "text": "Харків",
          "isCorrect": false
        },
        {
          "id": 4,
          "questionId": 1,
          "text": "Одеса",
          "isCorrect": false
        }
      ]
    },
    {
      "id": 2,
      "quizId": 1,
      "text": "Україна - це європейська країна?",
      "type": "BOOLEAN",
      "correctAnswer": null,
      "createdAt": "2025-07-25T16:30:00.000Z",
      "options": [
        {
          "id": 5,
          "questionId": 2,
          "text": "Так",
          "isCorrect": true
        },
        {
          "id": 6,
          "questionId": 2,
          "text": "Ні",
          "isCorrect": false
        }
      ]
    },
    {
      "id": 3,
      "quizId": 1,
      "text": "Назвіть найдовшу річку України",
      "type": "INPUT",
      "correctAnswer": "Дніпро",
      "createdAt": "2025-07-25T16:30:00.000Z",
      "options": []
    }
  ]
}
```

#### Коди статусу:
- `201` - Квіз успішно створено
- `500` - Помилка сервера

---

### 2. Отримати всі квізи

**GET** `/api/quizzes`

Повертає список всіх квізів з базовою інформацією.

#### Приклад відповіді:
```json
[
  {
    "id": 1,
    "title": "Загальні знання",
    "questionCount": 3
  },
  {
    "id": 2,
    "title": "Історія України",
    "questionCount": 5
  }
]
```

#### Коди статусу:
- `200` - Успішно отримано
- `500` - Помилка сервера

---

### 3. Отримати квіз за ID

**GET** `/api/quizzes/:id`

Повертає повну інформацію про квіз, включаючи всі питання та варіанти відповідей.

#### Параметри:
- `id` (number) - ID квізу

#### Приклад запиту:
```bash
GET /api/quizzes/1
```

#### Приклад відповіді:
```json
{
  "id": 1,
  "title": "Загальні знання",
  "createdAt": "2025-07-25T16:30:00.000Z",
  "updatedAt": "2025-07-25T16:30:00.000Z",
  "questions": [
    {
      "id": 1,
      "quizId": 1,
      "text": "Яка столиця України?",
      "type": "CHECKBOX",
      "correctAnswer": null,
      "createdAt": "2025-07-25T16:30:00.000Z",
      "options": [
        {
          "id": 1,
          "questionId": 1,
          "text": "Київ",
          "isCorrect": true
        },
        {
          "id": 2,
          "questionId": 1,
          "text": "Львів",
          "isCorrect": false
        }
      ]
    }
  ]
}
```

#### Коди статусу:
- `200` - Успішно отримано
- `404` - Квіз не знайдено
- `500` - Помилка сервера

---

### 4. Видалити квіз

**DELETE** `/api/quizzes/:id`

Видаляє квіз та всі пов'язані з ним питання й варіанти відповідей.

#### Параметри:
- `id` (number) - ID квізу

#### Приклад запиту:
```bash
DELETE /api/quizzes/1
```

#### Відповідь:
Порожній відповідь з кодом статусу `204`

#### Коди статусу:
- `204` - Успішно видалено
- `500` - Помилка сервера

---

## 🧪 Тестування API

### Використання cURL

#### Створити квіз:
```bash
curl -X POST http://localhost:3000/api/quizzes \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Тестовий квіз",
    "questions": [
      {
        "text": "Це тестове питання?",
        "type": "BOOLEAN",
        "options": ["Так", "Ні"],
        "correctAnswers": ["Так"]
      }
    ]
  }'
```

#### Отримати всі квізи:
```bash
curl http://localhost:3000/api/quizzes
```

#### Отримати квіз за ID:
```bash
curl http://localhost:3000/api/quizzes/1
```

#### Видалити квіз:
```bash
curl -X DELETE http://localhost:3000/api/quizzes/1
```

### Використання Postman

1. Імпортуйте колекцію з наступними запитами:
2. Встановіть базовий URL: `http://localhost:3000/api`
3. Для POST запитів використовуйте `Content-Type: application/json`

## 🏗️ Структура проекту

```
backend/
├── src/
│   ├── controllers/
│   │   └── quiz-controller.ts     # Логіка обробки запитів
│   ├── routes/
│   │   └── quiz-routes.ts         # Маршрути API
│   ├── types/
│   │   └── quiz-types.ts          # TypeScript типи
│   ├── prisma/
│   │   └── client.ts              # Prisma клієнт
│   ├── generated/
│   │   └── prisma/                # Згенеровані Prisma типи
│   └── index.ts                   # Головний файл сервера
├── prisma/
│   ├── schema.prisma              # Схема бази даних
│   ├── dev.db                     # SQLite база даних
│   └── migrations/                # Міграції бази даних
├── package.json
└── README.md
```

## 🔧 Налаштування

### Змінні середовища

Створіть файл `.env` в кореневій директорії backend:

```env
DATABASE_URL="file:./dev.db"
```

### Команди Prisma

```bash
# Створити нову міграцію
npx prisma migrate dev --name migration_name

# Застосувати міграції
npx prisma migrate deploy

# Згенерувати клієнт
npx prisma generate

# Відкрити Prisma Studio (GUI для бази даних)
npx prisma studio
```

## 🐛 Типові проблеми

### Помилка "datatype mismatch"
Переконайтеся, що Prisma клієнт згенеровано після останніх міграцій:
```bash
npx prisma generate
```

### Порт вже використовується
Змініть порт у файлі `src/index.ts` або зупиніть процес, що використовує порт 3000:
```bash
lsof -ti:3000 | xargs kill -9
```

## 🤝 Контрибуція

1. Форкніть репозиторій
2. Створіть feature гілку (`git checkout -b feature/amazing-feature`)
3. Зробіть коміт (`git commit -m 'Add some amazing feature'`)
4. Запуште в гілку (`git push origin feature/amazing-feature`)
5. Відкрийте Pull Request

## 📝 Ліцензія

Цей проект ліцензовано під MIT ліцензією.
