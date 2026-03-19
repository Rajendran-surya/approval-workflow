# Approval Workflow System

A simple web-based approval system where users create requests and managers approve/reject them.

## Tech Stack
- Backend: Node.js, Express, Sequelize, MySQL
- Frontend: Angular, Bootstrap

## Prerequisites
- Node.js (v18+)
- MySQL (or PostgreSQL)
- Angular CLI (`npm install -g @angular/cli`)

## Setup Instructions

### Backend
1. Navigate to `backend` folder.
2. Run `npm install`.
3. Create a MySQL database named `approval_db`.
4. Copy `.env.example` to `.env` and update database credentials.
5. Run `npm start` (or `npm run dev` for nodemon with auto-reload).
6. Server runs on http://localhost:3000.

### Frontend
1. Navigate to `frontend` folder.
2. Run `npm install`.
3. Run `ng serve`.
4. Open http://localhost:4200.

## API Documentation

### POST /api/requests
Create a new request.
**Body** (JSON):
```json
{
  "title": "string",
  "description": "string",
  "requestedBy": "string",
  "requestType": "LEAVE|EXPENSE|GENERAL"
}