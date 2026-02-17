# AI Habit Tracker - Project Runner Script
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  AI Habit Tracker - Starting Project" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check if required tools are installed
function Test-Command($cmdname) {
    return [bool](Get-Command -Name $cmdname -ErrorAction SilentlyContinue)
}

# Check Maven
if (-not (Test-Command "mvn")) {
    Write-Host "ERROR: Maven is not installed or not in PATH" -ForegroundColor Red
    Write-Host "Please install Maven and try again" -ForegroundColor Red
    Read-Host "Press Enter to exit"
    exit 1
}

# Check Node.js
if (-not (Test-Command "node")) {
    Write-Host "ERROR: Node.js is not installed or not in PATH" -ForegroundColor Red
    Write-Host "Please install Node.js and try again" -ForegroundColor Red
    Read-Host "Press Enter to exit"
    exit 1
}

# Get current directory
$scriptPath = Split-Path -Parent $MyInvocation.MyCommand.Definition
Write-Host "Working directory: $scriptPath" -ForegroundColor Gray

Write-Host ""
Write-Host "Starting Backend Server (Spring Boot)..." -ForegroundColor Yellow
Write-Host "========================================" -ForegroundColor Yellow

# Start backend in new PowerShell window
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$scriptPath/backend'; mvn spring-boot:run" -WindowStyle Normal

# Wait for backend to start
Write-Host "Waiting for backend to initialize..." -ForegroundColor Gray
Start-Sleep -Seconds 10

Write-Host ""
Write-Host "Starting Frontend Server (React)..." -ForegroundColor Yellow
Write-Host "========================================" -ForegroundColor Yellow

# Start frontend in new PowerShell window
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$scriptPath/frontend'; npm run dev" -WindowStyle Normal

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "Project Startup Complete!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host "Backend:  http://localhost:8080/api" -ForegroundColor Green
Write-Host "Frontend: http://localhost:5173" -ForegroundColor Green
Write-Host ""
Write-Host "Both servers are running in separate windows." -ForegroundColor Cyan
Write-Host "Close those windows to stop the servers." -ForegroundColor Cyan
Write-Host ""

Read-Host "Press Enter to exit this launcher"