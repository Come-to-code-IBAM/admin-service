# ================================
#  admin-service (NestJS) — PRODUCTION
# ================================

# 1. Dépendances
FROM node:20-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci && npm cache clean --force

# 2. Build (génère le client Prisma puis compile NestJS)
FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npx prisma generate --schema src/infrastructure/database/prisma/schema.prisma
RUN npm run build

# 3. Runner
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

RUN addgroup -g 1001 -S nodejs && adduser -S nestjs -u 1001

COPY --from=builder --chown=nestjs:nodejs /app/dist ./dist
COPY --from=builder --chown=nestjs:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=nestjs:nodejs /app/package*.json ./
# Le schéma + le client Prisma généré sont nécessaires à l'exécution
COPY --from=builder --chown=nestjs:nodejs /app/src/infrastructure/database/prisma ./src/infrastructure/database/prisma

USER nestjs
EXPOSE 3001
ENV PORT=3001
# Applique les migrations/schéma puis démarre l'API
CMD ["sh", "-c", "npx prisma db push --schema src/infrastructure/database/prisma/schema.prisma --skip-generate && node dist/main"]
