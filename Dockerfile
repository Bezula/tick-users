# syntax=docker/dockerfile:1

FROM node:18-alpine

WORKDIR /app

COPY package.json .

RUN npm install --omit=dev

COPY . .

CMD ["npm", "run", "start"]