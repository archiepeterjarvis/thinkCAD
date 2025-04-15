FROM node:18-alpine

WORKDIR /app

COPY package.json ./
RUN pnpm install --force

COPY . .

EXPOSE 3000

ENV WATCHPACK_POLLING=true

CMD ["npx", "next", "dev", "--turbopack"]
