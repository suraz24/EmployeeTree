FROM node:latest

LABEL email="surazad9851@gmail.com"

ENV PORT=4000
ENV mongoUsername=admin,
ENV mongoPW=Test123!,
ENV mongoDB=employeedb

COPY . /var/www/emptree-server

WORKDIR /var/www/emptree-server

EXPOSE $PORT

RUN npm install

ENTRYPOINT ["npm", "start"]