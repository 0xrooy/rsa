#!/bin/bash

echo "🚀 Starting app..."

# Check if docker-compose.yml changed since last build
if [ docker-compose.yml -nt .last-docker-build ]; then
  echo "⚠️  Detected changes in docker-compose.yml"
  echo "🛠️  Rebuilding containers..."
  docker compose down
  docker compose up --build -d
  touch .last-docker-build
else
  docker compose up -d
fi

sleep 3
xdg-open http://localhost:8080
