# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

"Carnet du troupeau" — service admin (NestJS). A digital livestock registry backend
(French-language domain: éleveurs = herders, agriculteurs = farmers, animaux = animals,
vols = thefts). Built in hexagonal architecture (ports & adapters): the domain has zero
technical dependencies; adapters plug in Prisma, auth, public-id generation, etc.

**Current state: this is a scaffold, not a working implementation.** Every use case,
repository adapter, domain service, and validator method body is `throw new Error('Not
implemented')`. What *is* real and correct is the wiring: module DI bindings (port →
adapter), controller routes, DTO shapes, Prisma schema, and the layering itself. When
asked to "implement X" or "add a feature," expect to be filling in an existing stub
rather than creating structure from scratch — find the existing use case / adapter /
validator first before adding new files.

## Commands

```bash
npm install
npm run db:generate    # prisma generate (schema at src/infrastructure/database/prisma/schema.prisma)
npm run db:push        # prisma db push (no migrations directory — schema is pushed directly)
npm run start:dev      # nest start --watch
npm run build           # nest build
npm run lint            # eslint --fix on src/**/*.ts
```

There is no test suite configured (no Jest config, no `*.spec.ts` files, no `test`
script). Don't assume `npm test` works.

Docker: `docker-compose.yml` defines `dev` and `prod` profiles (e.g.
`docker compose --profile dev up`), each pairing the service with its own Postgres
container and an env file under `src/infrastructure/config/.env.dev` /
`.env.prod` (not committed — create locally). Note the Prisma schema's datasource
is currently `sqlite`; the actual DB used at runtime is whatever `DATABASE_URL`
points at, so check that env var before assuming which engine is active.

## Architecture

Layers live under `src/`, each with a strict dependency direction: `domain` depends on
nothing; `application` depends only on `domain`; `adapter` and `infrastructure` depend
inward and implement domain ports.

```
src/
├── domain/                     core business logic, no framework/library imports
│   ├── entities/                Animal, Eleveur, Agriculteur, User, Alert, Campaign, TheftReport, ...
│   ├── enums/                    statuses, roles, alert types/channels
│   ├── errors/                   BusinessError (+ DomainErrorCode) — the only exception type the domain throws
│   ├── port/in/                  inbound ports, e.g. PublicIdGeneratorPort (entity-prefixed ids)
│   ├── port/out/                 outbound ports = repository interfaces, one per aggregate
│   └── services/validators/      pure business-rule validators, called from use cases
├── application/
│   ├── use_case/                 one class per use case (e.g. EnrollAnimalUseCase.execute()), organized by aggregate folder
│   ├── mapper/                    domain entity → HTTP response shape
│   └── dto/                       response-side DTOs (e.g. dashboard aggregates)
├── adapter/
│   ├── in/                       NestJS controllers + request DTOs + one Module per aggregate (DI root)
│   └── out/
│       ├── persistence/           Prisma-backed repository adapters + persistence mappers (domain entity ↔ Prisma row)
│       └── public-id/             NanoidGeneratorAdapter implements PublicIdGeneratorPort
└── infrastructure/
    ├── auth/                      PasswordService, TokenService (JWT) — both stubbed
    ├── config/                    env-driven configuration() factory for @nestjs/config
    ├── database/prisma/           PrismaService/Module + schema.prisma (single source of DB schema)
    └── filters/                   BusinessErrorFilter — @Catch(BusinessError), maps domain errors to HTTP (stubbed)
```

### Wiring pattern (per aggregate)

Each aggregate (Animal, Alert, Campaign, Eleveur, Auth, Health) has one `*.module.ts`
under `adapter/in/` that is the single place dependency inversion is materialized:
domain port tokens (`Symbol`, e.g. `ANIMAL_REPOSITORY`) are bound to their concrete
adapter classes via `{ provide: TOKEN, useClass: ConcreteAdapter }`. Controllers only
depend on use case classes; use cases only depend on port interfaces (never on Prisma
or the concrete adapter directly). When adding a new use case or adapter, register it
in the corresponding aggregate module, not in `app.module.ts`.

### Public IDs

Internal Prisma `id` (uuid) is never exposed. Every entity also has a `public_id`
(unique), generated via `NanoidGeneratorAdapter` as `{prefix}_{nanoid(12)}` — prefixes
defined in `PublicIdPrefix` (`src/domain/port/in/generate-public-id/generator-public-id.port.ts`),
e.g. `anm_...` for animals, `elv_...` for eleveurs, `alt_...` for alerts. Repository
ports look entities up by `publicId`, not by internal `id`.

### Errors

Domain/use-case code throws `BusinessError(code: DomainErrorCode, message, details?)`
— never raw `Error` or Nest `HttpException`. `DomainErrorCode` (`src/domain/errors/codes.error.ts`)
is the exhaustive list of business error cases; add new cases there rather than
inventing ad-hoc strings. `BusinessErrorFilter` is the single point translating these
into HTTP responses (currently unimplemented).

### Data model

`schema.prisma` is the one source of truth for persistence shape (no separate
migrations folder — workflow is `db:push`, not migrate). Key relations: `EleveurTable`
owns `AnimalTable`s; `AnimalTable` has optional `TheftReportTable`s; `UserTable`
(agents/admins) registers eleveurs/agriculteurs and enrolls animals, tracked via
`registered_by` / `enrolled_by` foreign keys to `public_id`. Persistence mappers in
`adapter/out/persistence/mapper/` convert between Prisma row shape (snake_case) and
domain entities (camelCase) — repository adapters must go through these, not build
domain entities inline.
