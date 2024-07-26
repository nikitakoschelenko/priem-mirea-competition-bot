FROM node:slim

RUN apt-get update -y && apt-get install -y -q --no-install-recommends openssl libfontconfig1

WORKDIR /app

COPY ./package.json ./package-lock.json ./
RUN npm ci

COPY ./ ./
RUN npm run db:generate
RUN npm run build

CMD ["bash", "-c", "npm run db:migrate && npm start"]
