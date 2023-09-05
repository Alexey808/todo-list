FROM node:18

WORKDIR /app

COPY package.json package-lock.json ./

VOLUME [ "/app/dist/front" ]

RUN npm ci

COPY . .

RUN npm run build
