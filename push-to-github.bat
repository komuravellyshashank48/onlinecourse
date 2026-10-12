@echo off
setlocal enabledelayedexpansion
title Push SemiconTech Academy to GitHub
color 0B

echo =======================================================
echo     SemiconTech Academy - Push to GitHub
echo =======================================================
echo.

set "GIT_EXE=C:\Users\ettam\AppData\Local\Microsoft\WinGet\Packages\Git.MinGit_Microsoft.Winget.Source_8wekyb3d8bbwe\cmd\git.exe"

if exist "%GIT_EXE%" (
    set "GIT_CMD=%GIT_EXE%"
) else (
    set "GIT_CMD=git"
)

cd /d "%~dp0"

echo Current Git status:
"%GIT_CMD%" status --short
echo.

set /p REPO_URL="Enter your GitHub Repository URL (e.g. https://github.com/username/repo-name.git): "

if "%REPO_URL%"=="" (
    echo [ERROR] No URL entered. Operation cancelled.
    pause
    exit /b 1
)

echo.
echo [1/3] Setting remote origin...
"%GIT_CMD%" remote remove origin 2>nul
"%GIT_CMD%" remote add origin "%REPO_URL%"

echo [2/3] Setting branch to main...
"%GIT_CMD%" branch -M main

echo [3/3] Pushing to GitHub...
"%GIT_CMD%" push -u origin main

if %ERRORLEVEL% equ 0 (
    echo.
    echo =======================================================
    echo   SUCCESS! Your project has been pushed to GitHub.
    echo =======================================================
) else (
    echo.
    echo =======================================================
    echo   Push failed or required authentication.
    echo   Please make sure your repository exists on GitHub
    echo   and you have permissions to push to it.
    echo =======================================================
)

pause
