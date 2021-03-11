FROM node

WORKDIR /app

COPY ./package.json .
COPY ./server/package.json ./server/
RUN npm --prefix ./server i --production

COPY ./server/build ./server/
COPY ./server/.env ./server/

WORKDIR /app/server

ENV NODE_ENV production

EXPOSE 4000

CMD ["node", "index.js"]
