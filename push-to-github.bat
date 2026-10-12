@echo off
setlocal enabledelayedexpansion
title Push SemiconTech Academy to GitHub
color 0B

set "GIT_DIR=C:\Users\ettam\AppData\Local\Microsoft\WinGet\Packages\Git.MinGit_Microsoft.Winget.Source_8wekyb3d8bbwe\cmd"
set "PATH=%GIT_DIR%;%PATH%"

cls
echo ================================================================
echo       SemiconTech Academy - Push to GitHub
echo ================================================================
echo Target Repository:
echo   https://github.com/komuravellyshashank48/onlinecourse.git
echo ================================================================
echo.
echo Choose how you want to sign in:
echo.
echo  [1] Sign In via Browser (RECOMMENDED - No token needed!)
echo  [2] Paste a Personal Access Token (PAT)
echo.
set /p CHOICE="Select [1 or 2] and press Enter (Default is 1): "

if "%CHOICE%"=="2" goto USE_TOKEN

:USE_BROWSER
echo.
echo ================================================================
echo  Starting Browser Sign-In...
echo  1. A one-time 8-character code will appear below (e.g. ABCD-1234).
echo  2. Copy that code, press ENTER, and your browser will open.
echo  3. Paste the code in the browser and click "Authorize".
echo ================================================================
echo.
gh auth login --hostname github.com --git-protocol https --web
if %ERRORLEVEL% neq 0 (
    echo.
    echo Login was cancelled or failed.
    goto FAILED
)
gh auth setup-git
goto DO_PUSH

:USE_TOKEN
echo.
set /p USER_TOKEN="Enter your GitHub Token (e.g. ghp_...): "
if "%USER_TOKEN%"=="" (
    echo No token entered.
    goto FAILED
)
cd /d "C:\Users\ettam\.gemini\antigravity\scratch\course-management-system"
git branch -M main
git remote remove origin 2>nul
git remote add origin https://%USER_TOKEN%@github.com/komuravellyshashank48/onlinecourse.git
echo.
echo Pushing project to GitHub...
git push -u origin main
if %ERRORLEVEL% equ 0 (
    git remote set-url origin https://github.com/komuravellyshashank48/onlinecourse.git 2>nul
    goto SUCCESS
) else (
    git remote set-url origin https://github.com/komuravellyshashank48/onlinecourse.git 2>nul
    goto FAILED
)

:DO_PUSH
echo.
echo ================================================================
echo  Pushing project to GitHub...
echo ================================================================
cd /d "C:\Users\ettam\.gemini\antigravity\scratch\course-management-system"
git branch -M main
git remote remove origin 2>nul
git remote add origin https://github.com/komuravellyshashank48/onlinecourse.git
git push -u origin main

if %ERRORLEVEL% equ 0 goto SUCCESS
goto FAILED

:SUCCESS
echo.
echo ================================================================
echo   SUCCESS! All Frontend and Backend files have been pushed to:
echo   https://github.com/komuravellyshashank48/onlinecourse
echo ================================================================
echo.
pause
exit /b 0

:FAILED
echo.
echo ================================================================
echo   Push failed or was cancelled.
echo ================================================================
echo.
pause
exit /b 1
