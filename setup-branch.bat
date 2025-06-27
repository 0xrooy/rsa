@echo off
echo What is your name? (e.g. siti, nur)
set /p NAME=
git checkout -b %NAME%-branch
git pull origin main
git push origin %NAME%-branch
pause
