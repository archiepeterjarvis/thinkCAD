FROM node:18-alpine

WORKDIR /app

COPY package.json ./

RUN npm install -g pnpm
RUN pnpm install

COPY . .

EXPOSE 3000

ENV WATCHPACK_POLLING=true

CMD ["npx", "next", "dev", "--turbopack"]
