@echo off
setlocal
cd /d "%~dp0"
set PATH=%CD%\tools\git\cmd;%PATH%

echo ========================================================
echo Pushing Udemy Clone to https://github.com/DasAbin/udemy-clone.git
echo ========================================================
echo.

git push -u origin main

if %ERRORLEVEL% equ 0 (
    echo.
    echo ========================================================
    echo SUCCESS! Repository successfully pushed to GitHub.
    echo ========================================================
) else (
    echo.
    echo If authentication failed, please enter your GitHub Personal Access Token (PAT) when prompted, or create one at https://github.com/settings/tokens
)

echo.
pause
