@echo off
title Udemy Frontend Server (Port 5173)
cd /d "%~dp0"
set "PATH=%~dp0tools\node;%PATH%"
echo Starting Frontend on http://localhost:5173 ...
call "%~dp0tools\node\npm.cmd" --prefix frontend run dev
pause
