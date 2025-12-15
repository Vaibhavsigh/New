FROM node:18-alpine AS base

WORKDIR /app

# Install dependencies
COPY package.json yarn.lock .yarnrc.yml ./
COPY .yarn ./.yarn
COPY packages/shared/package.json ./packages/shared/
COPY services/api/package.json ./services/api/

RUN yarn install --immutable

# Copy source
COPY packages/shared ./packages/shared
COPY services/api ./services/api

# Build
RUN yarn workspace @monorepo/shared build
RUN yarn workspace @monorepo/api build

# Production image
FROM node:18-alpine

WORKDIR /app

ENV NODE_ENV=production

COPY --from=base /app/node_modules ./node_modules
COPY --from=base /app/packages/shared/dist ./packages/shared/dist
COPY --from=base /app/packages/shared/package.json ./packages/shared/
COPY --from=base /app/services/api/dist ./services/api/dist
COPY --from=base /app/services/api/package.json ./services/api/

EXPOSE 3000

CMD ["node", "services/api/dist/index.js"]
