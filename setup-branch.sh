#!/bin/bash
echo "Enter your name (e.g., rooy, hanim, nurina):"
read NAME
git checkout -b "$NAME-branch"
git pull origin main
git push origin "$NAME-branch"
