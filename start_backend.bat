@echo off
title Udemy Backend Server (Port 5001)
cd /d "%~dp0"
set "PATH=%~dp0tools\node;%PATH%"
echo Starting Backend API on http://localhost:5001 ...
call "%~dp0tools\node\npm.cmd" --prefix backend run dev
pause
