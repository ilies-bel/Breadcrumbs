FROM node:latest

WORKDIR /usr/src/app
COPY package.json .
COPY .next .
RUN npm install

COPY . .

CMD npm run build && npm run start
