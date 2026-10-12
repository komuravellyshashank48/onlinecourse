@echo off
title SemiconTech LMS - Course Management System
echo ==============================================================
echo    🎓 SemiconTech Academy - Course Management System
echo ==============================================================
echo.
cd /d "%~dp0"

echo [1/3] Checking if server is already running on port 8080...
netstat -ano | findstr :8080 | findstr LISTENING >nul
if %errorlevel% == 0 (
    echo [OK] Server is already active on http://localhost:8080!
    echo [2/3] Opening your browser to http://localhost:8080/...
    start http://localhost:8080/
    echo [3/3] Ready! Enjoy your learning!
    timeout /t 3 >nul
    exit /b 0
)

echo [2/3] Starting Spring Boot Server from standalone JAR...
echo Server URL: http://localhost:8080/
echo (Keep this window open to keep the website active)
echo.
timeout /t 2 >nul
start "" http://localhost:8080/
java -jar "target\course-management-system-1.0.0.jar"
pause
