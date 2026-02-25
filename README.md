# Visible One Meeting Booking API

## Overview

The Visible One Meeting Booking API is a RESTful backend service built
to manage a single meeting room booking system with role-based access
control.

The system supports: - User management - JWT authentication - Role-based
permissions (Admin, Owner, User) - Booking management - Booking overlap
validation - Swagger API documentation

---

## Tech Stack

### Backend Framework

- NestJS v11
- TypeScript

### Database

- MongoDB
- Mongoose ODM

### Authentication & Security

- JWT (@nestjs/jwt)
- Passport
- passport-jwt
- bcrypt (password hashing)

### Validation & Transformation

- class-validator
- class-transformer

### API Documentation

- @nestjs/swagger
- swagger-ui-express
- OpenAPI 3.0

### Linting & Formatting

- ESLint
- Prettier

---

## Project Scripts

- npm run start:dev → Start development server
- npm run build → Build production files
- npm run start:prod → Run production build
- npm run test → Run unit tests
- npm run test:e2e → Run E2E tests
- npm run lint → Run ESLint
- npm run format → Run Prettier

---

## Architecture

Modular NestJS architecture: - Auth Module - User Module - Booking
Module - DTO-based validation - Service-layer business logic -
Guard-based permission enforcement

All permission checks are enforced server-side.

---

## Roles & Permissions

### User

Can: - Create booking - View all bookings - Delete own bookings

Cannot: - Delete others' bookings - Manage users

### Owner

Can: - Create booking - View all bookings - Delete any booking - View
usage summary

Cannot: - Create users - Delete users - Change roles

### Admin

Can: - Create users - Delete users - Update user roles - View all
users - View all bookings - Delete any booking

---

## Booking Rules

1.  startTime must be before endTime
2.  Bookings must not overlap
3.  Overlap detection handles:
    - Identical ranges
    - Partial overlaps
    - Nested ranges
    - Back-to-back bookings (clearly defined)
4.  All time is handled in UTC
5.  Invalid operations return proper HTTP error responses

---

## API Base Path

/api/v1

---

## Authentication Endpoints

POST /api/v1/auth/register\
POST /api/v1/auth/login

---

## User Endpoints

GET /api/v1/users/env\
POST /api/v1/users\
GET /api/v1/users\
GET /api/v1/users/{id}\
PUT /api/v1/users/{id}\
DELETE /api/v1/users/{id}

---

## Booking Endpoints

POST /api/v1/bookings\
GET /api/v1/bookings\
GET /api/v1/bookings/user/{id}\
GET /api/v1/bookings/{id}\
PUT /api/v1/bookings/{id}\
DELETE /api/v1/bookings/{id}

---

## Data Models

### User

- id
- name
- email
- password (hashed)
- role (admin \| owner \| user)
- createdAt

### Booking

- id
- userId
- name
- description
- startTime
- endTime
- status (pending \| meeting \| completed)
- createdAt

---

## Swagger Documentation

Available at: http://localhost:3000/docs\
Available at: http://localhost:3000/docs-json

OpenAPI Version: 3.0

---

## Error Handling

- 400 → Validation errors
- 401 → Unauthorized
- 403 → Forbidden
- 404 → Not Found
- 409 → Booking conflict

All errors return structured JSON responses.

---

## Environment Variables

PORT=\
MONGO_URI=\
JWT_SECRET=\
JWT_EXPIRES_IN=
