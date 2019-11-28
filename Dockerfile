FROM mhart/alpine-node:10

WORKDIR /app
COPY . .

RUN yarn install
RUN yarn build

EXPOSE 14000
CMD ["yarn", "start"]
