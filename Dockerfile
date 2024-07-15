FROM node:20-alpine3.19 AS build

WORKDIR /usr/src/app

COPY package.json yarn.lock ./
COPY prisma ./prisma/

RUN yarn

COPY . .

RUN yarn run build
RUN yarn install --production && yarn cache clean
RUN yarn run prisma:generate

FROM node:20-alpine3.19

WORKDIR /usr/src/app

COPY --from=build /usr/src/app/package.json ./package.json
COPY --from=build /usr/src/app/dist ./dist
COPY --from=build /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/prisma ./prisma

EXPOSE 3333

CMD ["/bin/sh", "-c", "yarn run start:migrate:prod"]