#!/bin/sh
set -e

# Inject secrets from AWS SecretsManager when $SECRETS is set.
# Required by the SRE Bootstrapper. Remove the following lines if this API is
# deployed to a different environment.
if [ ! -z "$SECRETS" ]
then
  export $(echo $SECRETS | jq -j "to_entries|map(\"\(.key)=\(.value|tostring) \")|.[]")
fi

# Run migrations
yarn migrate:latest

# Then exec the container's main process (what's set as CMD in the Dockerfile).
exec "$@"
