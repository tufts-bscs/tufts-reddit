#! /bin/bash
npm run build:server
docker build -t tuftsbscs/tufts-reddit:latest .
docker push tuftsbscs/tufts-reddit:latest
ssh root@ "docker pull tuftsbscs/tufts-reddit:latest && docker tag tuftsbscs/tufts-reddit:latest dokku/tufts-reddit:latest && dokku tags:deploy tufts-reddit latest"