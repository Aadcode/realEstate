FROM node:22-alpine AS deps

WORKDIR /REFRONTEND
COPY package.json package-lock.json* ./
RUN npm install

FROM node:22-alpine AS builder

WORKDIR /REFRONTEND
COPY --from=deps /REFRONTEND/node_modules ./node_modules
COPY . .

RUN npm run build

FROM node:22-alpine AS runner

WORKDIR /REFRONTEND

COPY --from=deps /REFRONTEND/node_modules ./node_modules
COPY --from=builder /REFRONTEND/.next ./.next
COPY --from=builder /REFRONTEND/public ./public
COPY --from=builder /REFRONTEND/package.json ./package.json
COPY --from=builder /REFRONTEND/next.config.js ./next.config.js

EXPOSE 3000

CMD ["npm", "start"]
