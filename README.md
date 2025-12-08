# Carsharing Backend

A NestJS backend API for a carsharing application, built with Prisma ORM and PostgreSQL.

## Tech Stack

- **NestJS 11** - Backend framework
- **Prisma 7** - ORM with CJS module format
- **PostgreSQL 16** - Database (via Docker)
- **TypeScript** - Type-safe development
- **class-validator** - DTO validation

## Features

- RESTful API with CRUD operations for Users and CarTypes
- Docker Compose for local PostgreSQL setup
- Prisma migrations for schema management
- Database seeding with automatic ID reset
- Global validation pipeline with whitelist protection

## Prerequisites

- Node.js 18+
- Docker & Docker Compose
- npm or yarn

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Start PostgreSQL

```bash
docker compose up -d
```

### 3. Configure Environment

Create a `.env` file:

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/carsharing?schema=public"
```

### 4. Run Migrations

```bash
npx prisma migrate dev
```

### 5. Seed Database (Optional)

```bash
npx prisma db seed
```

This will populate the database with default car types and reset ID sequences.

### 6. Start Development Server

```bash
npm run start:dev
```

The API will be available at `http://localhost:3000`.

## Available Scripts

```bash
# Development
npm run start:dev

# Production build
npm run build
npm run start:prod

# Database
npx prisma studio          # Open Prisma Studio UI
npx prisma migrate dev     # Create and apply migration
npx prisma db seed         # Run seed script
npx prisma migrate reset   # Reset database (development only)
```

## API Endpoints

### Users
- `GET /users` - List all users
- `GET /users/:id` - Get user by ID
- `POST /users` - Create new user
- `DELETE /users/:id` - Delete user

### CarTypes
- `GET /car-types` - List all car types
- `GET /car-types/:id` - Get car type by ID
- `PATCH /car-types/:id` - Update car type

## Project Structure

```
src/
├── users/              # User module
├── car-types/          # CarType module
├── prisma/             # Prisma service
└── main.ts             # App entry point

prisma/
├── schema.prisma       # Database schema
├── migrations/         # Migration history
└── seed.ts             # Seed script
```

## Database Schema

**User**
- `id` (Int, auto-increment)
- `name` (String)

**CarType**
- `id` (Int, auto-increment)
- `name` (String)
- `imageUrl` (String)

## Development Notes

### Why CommonJS?
This project uses CommonJS (`"module": "commonjs"`) due to Prisma 7's `moduleFormat="cjs"` requirement when using database adapters (`@prisma/adapter-pg`). This ensures compatibility between NestJS and Prisma's generated client.

### Seed Script Behavior
The seed script uses `TRUNCATE TABLE ... RESTART IDENTITY CASCADE` to reset ID sequences, ensuring IDs always start from 1 on reseed.

### Common Issues & Solutions
For troubleshooting Prisma, Docker, and NestJS integration issues, see [LEARNINGS.md](./LEARNINGS.md).

## Resources

- [NestJS Documentation](https://docs.nestjs.com)
- [Prisma Documentation](https://www.prisma.io/docs)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)

## License

This project is [MIT licensed](LICENSE).
