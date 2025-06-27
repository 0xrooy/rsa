#!/bin/bash

echo "Who are you? (e.g., rooy, siti, nur):"
read NAME

echo "🔁 Switching to main..."
git checkout main

echo "📡 Pulling latest changes from GitHub..."
git pull origin main

echo "🔀 Switching to your branch: $NAME-branch"
git checkout "$NAME-branch"

echo "🔗 Merging latest main into $NAME-branch..."
git merge main

echo "✅ Done! Your branch is now synced with the latest main."
