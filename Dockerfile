# Install dependencies only when needed
FROM node:16-alpine

WORKDIR /app

COPY ./backend/package*.json /app/

RUN yarn install --production

COPY ./backend /app

ENV PORT 5001

EXPOSE $PORT

RUN yarn add pm2 -g

CMD ["yarn", "startPro"]