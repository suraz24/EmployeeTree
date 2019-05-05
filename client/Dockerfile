FROM node:latest

LABEL email="surazad9851@gmail.com"

ENV PORT=3000
ENV SERVER_URL=http://localhost:4000/graphql

COPY . /var/www/emptree-client

WORKDIR /var/www/emptree-client

EXPOSE $PORT

RUN npm install

ENTRYPOINT ["npm", "start"]