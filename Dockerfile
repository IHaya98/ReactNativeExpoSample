FROM node:14-alpine

WORKDIR /usr/src/app/
COPY ./package.json /usr/src/app/
COPY ./package-lock.json /usr/src/app/
RUN apk update && apk add bash
RUN npm install

RUN npm install -g expo-cli