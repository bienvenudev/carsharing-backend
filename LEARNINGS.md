# NestJS + Prisma + Postgres Learnings

## Common Gotchas
- **Never edit applied migrations**: Prisma tracks each SQL file. Manually changing `migration.sql` (e.g., switching `User.name` from `INT` to `TEXT`) creates drift and blocks future `prisma migrate dev` runs. Instead, update `schema.prisma` and generate a new migration (or reset the DB if you already edited live tables).
- **ESM vs CJS mismatch**: Prisma 7 generates ES modules by default, but NestJS 11 compiles to CommonJS. Without adjustments you get `ReferenceError: exports is not defined` when running `dist/generated/prisma/client.js`. Fixes:
  1. Set `moduleFormat = "cjs"` in the `generator client` block.
  2. Use the official database adapter (e.g., `@prisma/adapter-pg`) so Prisma no longer expects Accelerate/edge configs.
- **PrismaClient constructor options**: After enabling `moduleFormat = "cjs"` Prisma expects explicit options. Provide them (via adapter) and keep the `PrismaService` constructor calling `super(clientOptions)`.
- **ENV loading**: Nest doesn*** need `.env` auto-loaded. Without `import 'dotenv/config';` in `main.ts`, `DATABASE_URL` stays undefined, Prisma can't connect, and the app crashes. Always load envs before bootstrapping or configure Nest’s ConfigModule.
- **Manual DB tweaks cause drift**: Running ad-hoc SQL (like altering columns directly in psql) makes Prisma believe the migration history is corrupted. Either revert the change manually or run `npx prisma migrate reset` before creating the next migration.
- **docker-compose volume path**: Postgres 18+ requires mounting `/var/lib/postgresql`, while 16 and below still use `/var/lib/postgresql/data`. Pick the right path for the image tag you run.
- **Port 5432 is not HTTP**: Don’t expect Postman to hit Postgres directly; only your Nest app should connect to that port.

## Practical How-Tos
- **Check DB schema**: `docker exec -it carsharing-db psql -U postgres -d carsharing -c '\d "User"'` lists columns + types. `\dt` shows tables.
- **Regenerate Prisma client**: Anytime `schema.prisma` changes run `npx prisma generate`. Deleting `generated/prisma` ensures stale code doesn’t linger.
- **Reset dev database**: `npx prisma migrate reset` drops all data and reapplies migrations—useful when you desynchronize schema history.
- **Docker workflows**:
  - Start DB: `docker compose up -d`
  - Check volume: `docker volume ls` + `docker volume inspect carsharing-backend_carsharing_data`
  - Logs when container keeps exiting: `docker logs carsharing-db`
- **PrismaService pattern**:
  ```ts
  import { Pool, PoolConfig } from 'pg';
  import { PrismaPg } from '@prisma/adapter-pg';
  import { Prisma, PrismaClient } from '../../generated/prisma/client';

  export class PrismaService extends PrismaClient {
    constructor() {
      const connectionString = process.env.DATABASE_URL;
      if (!connectionString) throw new Error('DATABASE_URL is missing');
      const poolConfig: PoolConfig = { connectionString };
      const adapter = new PrismaPg(new Pool(poolConfig));
      super({ adapter } satisfies Prisma.PrismaClientOptions);
    }
  }
  ```
- **Loading seed/startup data**: Build a Prisma seed script when you want default users/car types instead of hand-creating via Postman.
- **Checking migrations**: `npx prisma migrate status` tells you if the DB is ahead/behind your files before you attempt another migration.

## Mental Models
- **Stack layers**:
  `NestJS controllers/services → Prisma Client (ORM) → Postgres driver (pg) → Dockerized Postgres server`
  You never send HTTP to the DB; everything flows through Prisma.
- **Volume persistence**: Docker named volumes (e.g., `carsharing-backend_carsharing_data`) live on your disk and keep data even if containers are removed. They are not stored on Docker Hub.
- **Adapters vs Drivers**: Prisma 7’s adapters (e.g., `@prisma/adapter-pg`) wrap standard Node drivers to satisfy new runtime requirements. Databases (Postgres/MySQL) still run separately.
- **Migrations are append-only**: Treat each migration as historical record. If you need to change the schema, create a new migration rather than editing an old one.

## When Things Break
- **`PrismaClientConstructorValidationError`** → You’re using the default engine with CJS output. Install the adapter and pass it to `super({ adapter })`, or drop back to ESM (no `moduleFormat`).
- **`DATABASE_URL env variable is not defined`** → Load dotenv (or ConfigModule) before instantiating Prisma. Verify `.env` matches docker-compose credentials.
- **`Using engine type "client" requires adapter/accelerateUrl`** → Delete `generated/prisma`, regenerate after setting `moduleFormat = "cjs"` and adapter. Stale generated code can still reference the wrong engine.
- **`Prisma migrate dev` asks for reset** → You changed the DB outside Prisma. Decide whether to manually fix the drift or run `npx prisma migrate reset` and lose data.

Keep this sheet updated as you discover more Prisma + NestJS quirks. Use it as a checklist whenever something “mysterious” happens—the answer is often one of these traps.