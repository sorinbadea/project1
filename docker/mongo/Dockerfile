FROM ubuntu
MAINTAINER Darth Vader
RUN apt-get update
RUN apt-get -y install gnupg 
RUN apt-get -y install gnupg2 
RUN apt-get -y install gnupg1
RUN apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 7F0CEB10
RUN echo 'deb http://downloads-distro.mongodb.org/repo/ubuntu-upstart dist 10gen' | tee /etc/apt/sources.list.d/mongodb.lis
RUN apt-get update
RUN apt-get install -y mongodb
RUN mkdir -p /data/db
EXPOSE 27017
CMD ["/usr/bin/mongod", "--bind_ip_all"]
