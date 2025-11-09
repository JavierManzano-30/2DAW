FROM node:18-alpine

WORKDIR /usr/src/app

COPY server.js ./

RUN npm init -y && npm install express cors

EXPOSE 3000

CMD ["node", "server.js"]

