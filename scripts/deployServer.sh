#! /bin/bash
npm run build:server
heroku container:push web
heroku container:release web
