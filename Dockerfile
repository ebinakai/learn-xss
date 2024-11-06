FROM node:22-slim

WORKDIR /usr/src/app

COPY ./api/package*.json ./
RUN npm install

RUN npm install -g netlify-cli

COPY ./api .

CMD ["netlify", "dev"]
