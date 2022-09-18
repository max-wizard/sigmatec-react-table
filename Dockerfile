FROM node:16-alpine

WORKDIR /app

RUN yarn install
RUN yarn create next-app --typescript

COPY package.json yarn.lock ./
COPY package-lock.json ./


COPY next.config.js ./next.config.js
COPY store.ts ./store.ts
COPY babel.config.js ./babel.config.js
COPY tsconfig.json ./tsconfig.json

COPY storeData ./storeData
COPY pages ./pages
COPY .next ./.next
COPY node_modules ./node_modules
COPY public ./public
COPY component ./component
COPY styles ./styles

CMD ["yarn","dev"]