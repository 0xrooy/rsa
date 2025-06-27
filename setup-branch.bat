@echo off
set /p NAME=Enter your name (e.g., rooy, hanim, nurina): 
git checkout -b %NAME%-branch
git push origin %NAME%-branch
pause
