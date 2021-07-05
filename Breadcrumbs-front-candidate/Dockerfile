FROM node:latest

WORKDIR /usr/src/app
COPY package.json .

#RUN npm install --force

COPY . .

CMD npm run build && npm run serve

