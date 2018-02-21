#!/bin/bash


set -a;
. .env;
set +a;


npm run $1;
