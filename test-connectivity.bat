@echo off
echo ========================================
echo   Testing Habit Tracker Connectivity
echo ========================================
echo.

echo Testing backend health endpoint...
echo ========================================
curl -X GET http://localhost:8080/api/health
echo.
echo.

echo Testing habits endpoint...
echo ========================================
curl -X GET http://localhost:8080/api/habits
echo.
echo.

echo Testing frontend access...
echo ========================================
curl -X GET http://localhost:5173
echo.
echo.

echo ========================================
echo Test Complete!
echo ========================================
echo.
echo If you see connection errors above, make sure:
echo 1. Backend server is running (port 8080)
echo 2. Frontend server is running (port 5173)
echo 3. No firewall blocking the connections
echo.
pause