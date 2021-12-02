#!/bin/bash

export NODE_OPTIONS=--openssl-legacy-provider

ng build


scp -r dist/tmlb-ndi/* tmlb@ssh-tmlb.alwaysdata.net:/home/tmlb/www
