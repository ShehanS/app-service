FROM node:latest

COPY . /AUTH_SERVICE

WORKDIR /AUTH_SERVICE

RUN npm install --production

EXPOSE 8085

CMD ["node","index.js"]