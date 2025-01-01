#!/bin/bash
set -euo pipefail

PROJECT_ROOT=$(pwd)
LOG_FILE="$PROJECT_ROOT/app.log"
NODE_ENV="production"
CLIENT_URL="http://localhost:3000"

if [ ! -f "$PROJECT_ROOT/package.json" ]; then
  echo "Error: package.json not found in $PROJECT_ROOT" >&2
  exit 1
fi

if [ ! -f "$PROJECT_ROOT/.env" ]; then
  echo "Error: .env file not found in $PROJECT_ROOT" >&2
  exit 1
fi

source "$PROJECT_ROOT/.env"

if [ -z "$NODE_ENV" ]; then
  echo "Warning: NODE_ENV not found in .env, defaulting to production"
    NODE_ENV="production"
fi

if [ -z "$CLIENT_URL" ]; then
    echo "Warning: CLIENT_URL not found in .env, defaulting to http://localhost:3000"
     CLIENT_URL="http://localhost:3000"
fi

export NODE_ENV
export CLIENT_URL

cd "$PROJECT_ROOT"

npm start >> "$LOG_FILE" 2>&1 &

echo "Application started in the background. Check logs at: $LOG_FILE"