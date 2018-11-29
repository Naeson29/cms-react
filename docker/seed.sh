#!/usr/bin/env bash

sudo docker exec -it http-server /bin/sh -c 'node ./seeders/seed.js cp -r ./seeders/slider ./public/slider'

cp -r ../server/seeders/slider ../server/public