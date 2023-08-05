FROM node:14-alpine AS build-step

RUN mkdir -p /app

WORKDIR /app

COPY package.json /app

RUN npm install

COPY . /app

RUN npm run build --prod


#Segunda Etapa
FROM nginx:1.17.1-alpine

COPY --from=build-step /app/dist/frontend-prueba /usr/share/nginx/html

