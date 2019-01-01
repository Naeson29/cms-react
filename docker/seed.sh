#!/usr/bin/env bash

sudo docker exec -it http-server /bin/sh -c 'node ./seeders/seed.js'

sudo rm -R ../server/public/slider

sudo rm -R ../server/public/news

cp -r ../server/seeders/slider ../server/public

cp -r ../server/seeders/news ../server/public