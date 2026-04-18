# Request System


## Stack
- React (Vite)
- Redux Toolkit + React Redux
- SCSS Modules
- LocalStorage (persist state)

## Features

### Роль: User
- Створення заявки (Title, Description)
- Після створення заявка додається зі статусом **`new`**
- Перегляд власного списку заявок (title, short description, status)
- Редагування заявки, якщо статус `new`
- Видалення заявки
- Відображення дати створення
- Сортування заявок (нові/старі)

### Роль: Manager
- Перегляд усіх заявок:
  - ID
  - Title
  - Description
  - Status
  - Created date
- Зміна статусу:
  - `new` → `in progress`
  - `in progress` → `done`
- Фільтрація за статусом:
  - all
  - new
  - in progress
  - done

## Data persistence
Стан додатку (роль + список заявок) зберігається в LocalStorage.

Ключ LocalStorage:
- `request-system:v1`

## Project setup

### 1) Install dependencies
```bash
npm install
```

### 2) Run dev server
```bash
npm run dev
```

### 3) Build
```bash
npm run build
```

### 4) Preview production build
```bash
npm run preview
```

## Scripts
- `npm run dev` — запуск у режимі розробки
- `npm run build` — production build
- `npm run preview` — локальний перегляд production build



