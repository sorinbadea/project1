#FROM node:latest
WORKDIR /app
#COPY package.json /app
#RUN apt-get update
#RUN apt-get -y install npm
#RUN npm install express
#RUN npm install jade
#RUN npm install express-session
#RUN npm install ejs
#RUN npm install request
RUN npm install mongodb
#RUN npm init -y
#COPY index.js /app
#CMD node index.js
EXPOSE 8081
