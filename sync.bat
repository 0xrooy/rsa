@echo off
echo Who are you? (e.g., rooy, siti, nur):
set /p NAME=

echo Switching to main...
git checkout main

echo Pulling latest code from GitHub...
git pull origin main

echo Switching to branch: %NAME%-branch
git checkout %NAME%-branch

echo Merging main into %NAME%-branch...
git merge main

echo ✅ Done! Your branch is now up to date.
pause
