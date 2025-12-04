@echo off
echo ========================================
echo Pet Health Management Backend Starter
echo ========================================
echo.

cd ..\backend

echo Checking for Maven...
where mvn >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Maven is not installed or not in PATH
    echo Please install Maven from https://maven.apache.org/download.cgi
    pause
    exit /b 1
)

echo Maven found!
echo.

echo Building and starting the backend server...
echo This may take a few minutes on first run...
echo.

mvn spring-boot:run

pause
