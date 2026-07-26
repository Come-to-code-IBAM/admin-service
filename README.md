# Carnet du troupeau — Service admin (NestJS)

Backend en **architecture hexagonale** (ports & adaptateurs) : le domaine ne
dépend d'aucune technologie ; les adaptateurs branchent Prisma, l'auth, la
génération de public-id, etc.

## Couches
```
src/
├── domain/            cœur métier, sans dépendance technique
│   ├── entities/      Animal, Eleveur, Agriculteur, User, Alert, Campaign…
│   ├── enums/         statuts, rôles, types d'alerte, canaux
│   ├── errors/        BusinessError + codes
│   ├── port/in/       PublicIdGeneratorPort (préfixes par entité)
│   ├── port/out/      interfaces des dépôts (repositories)
│   └── services/      validateurs métier
├── application/       cas d'usage (orchestration), mappers HTTP, DTOs
├── adapter/
│   ├── in/            contrôleurs + DTOs de requête + modules (DI)
│   └── out/           persistence Prisma, public-id (nanoid), mappers
└── infrastructure/    Prisma, config, auth, filtres, main
```

## Adaptateur de public-id
`NanoidGeneratorAdapter` implémente `PublicIdGeneratorPort` : nanoid **préfixé
par entité** pour des identifiants lisibles (ex. `anm_V1StGXR8Z5jT`,
`elv_…`, `alt_…`). Préfixes définis dans `PublicIdPrefix`.

## État
Architecture complète et câblée (DI ports→adaptateurs). Les corps de méthodes
sont en `Not implemented` comme points d'extension. Les flux d'interaction
(vente / transfert de propriété) sont laissés de côté pour l'instant.

## Démarrage
```
npm install
npm run db:generate
npm run db:push
npm run start:dev
```
