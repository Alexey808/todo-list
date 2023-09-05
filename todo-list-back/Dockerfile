FROM node:18

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci

COPY . .

ENV PORT=3000

EXPOSE $PORT

CMD [ "npm", "run", "start" ]
