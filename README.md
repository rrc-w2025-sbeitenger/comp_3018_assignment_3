# Events API Project

Rest API built with Express and Typescript for managing events.

## Author
- Sven Beitenger

## Events API Overview

# Features
- Create, get, update, and delete events
- Health check endpoint
- Swagger documention
- Gitgub pages documentation deployment

# Why use this Events API?
- Create events efforlessly and manage them with ease! Say goodbye to the messy pen and paper spreadsheets, now you can keep everything in one centralized area!

## Installation Guide

# Prerequistes
- npm v11+
- Node.js v24+
- Git
- Firebase service account key

# 1. Clone Repo:
```bash
git clone https://github.com/rrc-w2025-sbeitenger/comp_3018_assignment_3
```

# 2. Install Dependencies:
```bash
- npm install
```

# 3. Create .env File:
- Create .env in root

Replace the placeholders wih your corresponding data:
```env
NODE_ENV=development
FIREBASE_PRIVATE_KEY="-----NOT REAL API KEY-----\nSOME_KEY\n-----NOT REAL API KEY-----\n"
FIREBASE_CONFIG=firebase_config_not_real
DATABASE_URL=http://superAwesomeDatabase.com
ALLOWED_ORIGINS=http://localhost:3000
```

# 3. Start Server
```bash
- npm run start
```

## API Request Examples

The examples below show complete requests and sample responses for common endpoints.

### 1. Health Check
```bash
curl --request GET \
  --url http://localhost:3000/api/v1/health \
  --header 'Accept: application/json'
```

**Response**

```json
{
  "status": "success",
  "data": {
    "status": 200,
    "uptime": 3724.58,
    "timestamp": "2026-01-10T00:00:00.000Z",
    "version": "1.0.0"
  }
}
```

### 2. Get an Event by ID
```bash
curl --request GET \
  --url http://localhost:3000/api/v1/events/evt_00007 \
  --header 'Accept: application/json'
```

**Response**

```json
{
  "status": "success",
  "data": {
    "id": "evt_00007",
    "name": "Tech Conference 2026",
    "date": "2026-12-01T09:00:00.000Z",
    "capacity": 100,
    "registrationCount": 50,
    "status": "active",
    "category": "conference",
    "createdAt": "2026-03-28T12:00:00.000Z",
    "updatedAt": "2026-03-28T12:00:00.000Z"
  }
}
```

### 3. Create an Event
```bash
curl --request POST \
  --url http://localhost:3000/api/v1/events \
  --header 'Content-Type: application/json' \
  --header 'Accept: application/json' \
  --data '{
    "name": "Tech Conference 2026",
    "date": "2026-12-01T09:00:00.000Z",
    "capacity": 100,
    "registrationCount": 50,
    "status": "active",
    "category": "conference"
  }'
```

**Response**

```json
{
  "status": "success",
  "data": {
    "id": "evt_00007",
    "name": "Tech Conference 2026",
    "date": "2026-12-01T09:00:00.000Z",
    "capacity": 100,
    "registrationCount": 50,
    "status": "active",
    "category": "conference",
    "createdAt": "2026-03-28T12:00:00.000Z",
    "updatedAt": "2026-03-28T12:00:00.000Z"
  }
}
```

## GitHub Pages Documention
- Full API documentation is available at: https://rrc-w2025-sbeitenger.github.io/comp_3018_assignment_3/

## Local Documention
- When running locally, access the API documentation at http://localhost:3000/api-docs