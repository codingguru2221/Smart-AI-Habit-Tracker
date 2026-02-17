@echo off
echo ========================================
echo   AI Habit Tracker - Starting Project
echo ========================================
echo.

REM Check if Maven is installed
where mvn >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Maven is not installed or not in PATH
    echo Please install Maven and try again
    pause
    exit /b 1
)

REM Check if Node.js is installed
where node >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Node.js is not installed or not in PATH
    echo Please install Node.js and try again
    pause
    exit /b 1
)

echo Starting Backend Server (Spring Boot)...
echo ========================================
cd backend
start "Backend Server" cmd /k "mvn spring-boot:run"
cd ..

timeout /t 10 /nobreak >nul

echo.
echo Starting Frontend Server (React)...
echo ========================================
cd frontend
start "Frontend Server" cmd /k "npm run dev"
cd ..

echo.
echo ========================================
echo Project Startup Complete!
echo ========================================
echo Backend:  http://localhost:8080/api
echo Frontend: http://localhost:5173
echo.
echo Press any key to close this window...
pause >nul