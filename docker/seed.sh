#!/usr/bin/env bash

sudo docker exec -it http-server /bin/sh -c 'node ./seeders/seed.js'
