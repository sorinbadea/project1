#!/bin/sh
#mongo 172.18.0.2/mydb
sudo docker run -p 8081:8081 -it --net=my-network -v ~/work/docker/nodejs/app/:/app node.js /bin/bash
