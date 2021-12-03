#!/bin/bash

#export NODE_OPTIONS=--openssl-legacy-provider

ng build --build-optimizer


scp -r dist/tmlb-ndi/* tmlb@ssh-tmlb.alwaysdata.net:/home/tmlb/www
