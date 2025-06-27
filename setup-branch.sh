#!/bin/bash
echo "Enter your name (e.g., rooy, hanim, nurina):"
read NAME
git checkout -b "$NAME-branch"
git push origin "$NAME-branch"

chmod +x setup-branch.sh

