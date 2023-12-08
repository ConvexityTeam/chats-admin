FROM node:18-alpine

WORKDIR /godmode

COPY . ./

RUN yarn install --prefer-offline --frozen-lockfile --non-interactive

RUN yarn build

ENV HOST 0.0.0.0

ENV PORT 3088

EXPOSE ${PORT}

ENTRYPOINT ["node", ".output/server/index.mjs"]

