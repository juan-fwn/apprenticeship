#!/bin/sh
set -e

/app/wait-for-it.sh db:$DATABASE_PORT -t 15 -- echo "Database ready!"

yarn install
yarn migrate:latest

# exec the container's main process (what's set as CMD in the Dockerfile).
exec "$@"
