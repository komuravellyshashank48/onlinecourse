@echo off
title Stop SemiconTech LMS Server
echo Stopping SemiconTech LMS server on port 8080...
for /f "tokens=5" %%a in ('netstat -ano ^| findstr :8080 ^| findstr LISTENING') do (
    taskkill /F /PID %%a
    echo Process %%a terminated.
)
echo Server stopped successfully.
pause
