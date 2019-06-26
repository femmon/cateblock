#!/bin/bash

heroku config -a $(heroku apps | sed 1,1d) | sed -e 1,1d -e s/": *"/=/ > ../.env
echo NODE_ENV=development >> ../.env
