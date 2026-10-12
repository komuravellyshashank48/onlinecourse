@echo off
setlocal enabledelayedexpansion
title Push SemiconTech Academy to GitHub
color 0B

echo =======================================================
echo     SemiconTech Academy - Push to GitHub
echo =======================================================
echo.
echo Repository: https://github.com/komuravellyshashank48/onlinecourse.git
echo.

set "GIT_EXE=C:\Users\ettam\AppData\Local\Microsoft\WinGet\Packages\Git.MinGit_Microsoft.Winget.Source_8wekyb3d8bbwe\cmd\git.exe"

if exist "%GIT_EXE%" (
    set "GIT_CMD=%GIT_EXE%"
) else (
    set "GIT_CMD=git"
)

cd /d "%~dp0"

echo [1/3] Verifying Git repository status...
"%GIT_CMD%" branch -M main
"%GIT_CMD%" remote remove origin 2>nul
"%GIT_CMD%" remote add origin https://github.com/komuravellyshashank48/onlinecourse.git

echo.
echo -------------------------------------------------------
echo  AUTHENTICATION OPTIONS:
echo  1. Enter your GitHub Personal Access Token (PAT)
echo     (Generate from: https://github.com/settings/tokens)
echo  2. Press ENTER to attempt standard login prompt
echo -------------------------------------------------------
echo.
set /p USER_TOKEN="Enter GitHub Token (or press ENTER to skip): "

if not "!USER_TOKEN!"=="" (
    echo.
    echo Configuring authenticated remote...
    "%GIT_CMD%" remote set-url origin https://!USER_TOKEN!@github.com/komuravellyshashank48/onlinecourse.git
)

echo.
echo [2/3] Pushing all branches and commits to GitHub...
"%GIT_CMD%" push -u origin main

if %ERRORLEVEL% equ 0 (
    echo.
    echo =======================================================
    echo   SUCCESS! Your project has been pushed to GitHub:
    echo   https://github.com/komuravellyshashank48/onlinecourse
    echo =======================================================
) else (
    echo.
    echo =======================================================
    echo   Push failed or token is required.
    echo.
    echo   Note: GitHub requires a Personal Access Token (PAT)
    echo   with 'repo' scope instead of your account password.
    echo   Create one at: https://github.com/settings/tokens
    echo =======================================================
)

:: Reset origin without embedded token for security
"%GIT_CMD%" remote set-url origin https://github.com/komuravellyshashank48/onlinecourse.git 2>nul

echo.
pause
