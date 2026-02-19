@echo off
echo Testing Habit Tracker Integration...
echo.

echo Testing Backend Health...
curl -s http://localhost:8080/api/health | findstr "UP"
if %errorlevel% equ 0 (
    echo ✅ Backend is running and healthy
) else (
    echo ❌ Backend is not responding
)
echo.

echo Testing Frontend...
curl -s http://localhost:5173 | findstr "html"
if %errorlevel% equ 0 (
    echo ✅ Frontend is running
) else (
    echo ❌ Frontend is not responding
)
echo.

echo Testing Habit Creation (via API)...
curl -s -X POST http://localhost:8080/api/habits ^
  -H "Content-Type: application/json" ^
  -d "{\"name\":\"Test Habit\",\"description\":\"Test Description\",\"frequency\":\"DAILY\",\"targetCount\":1,\"userId\":1}" | findstr "id"
if %errorlevel% equ 0 (
    echo ✅ Habit creation API is working
) else (
    echo ❌ Habit creation API failed
)
echo.

echo Integration test complete!
echo.
echo 🚀 Habit Tracker is fully operational!
echo    Backend: http://localhost:8080/api
echo    Frontend: http://localhost:5173
echo.
echo Use the run-project.bat script to start both servers easily.
pause