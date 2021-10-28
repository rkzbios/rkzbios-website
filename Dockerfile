FROM mhart/alpine-node:14.13

WORKDIR /app
COPY . .

RUN yarn install
RUN yarn build

EXPOSE 4000
CMD ["yarn", "start"]
