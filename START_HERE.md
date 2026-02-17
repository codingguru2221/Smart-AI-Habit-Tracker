# AI Habit Tracker - Project Runner

## 🚀 Quick Start

To run the complete project with both frontend and backend:

### Option 1: Batch File (Windows CMD)
Double-click `run-project.bat` or run from command prompt:
```cmd
run-project.bat
```

### Option 2: PowerShell Script
Run from PowerShell:
```powershell
.\run-project.ps1
```

## 📋 What This Script Does

1. **Checks Prerequisites**:
   - Verifies Maven installation
   - Verifies Node.js installation
   - Confirms both are in system PATH

2. **Starts Backend Server**:
   - Navigates to `backend/` directory
   - Runs `mvn spring-boot:run`
   - Server starts on `http://localhost:8080/api`

3. **Starts Frontend Server**:
   - Navigates to `frontend/` directory
   - Runs `npm run dev`
   - Server starts on `http://localhost:5173`

4. **Opens in Separate Windows**:
   - Both servers run in their own command windows
   - Easy to monitor logs and stop servers when needed

## ⚠️ Requirements

Make sure you have these installed:
- **Java 17+** (for Spring Boot backend)
- **Maven** (for building backend)
- **Node.js** (for frontend development)
- **npm** (comes with Node.js)

## 🛠️ Manual Start (Alternative)

If scripts don't work, you can start manually:

**Backend:**
```cmd
cd backend
mvn spring-boot:run
```

**Frontend (in new terminal):**
```cmd
cd frontend
npm run dev
```

## 📱 Access Your Application

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:8080/api
- **H2 Console**: http://localhost:8080/api/h2-console (for database)

## 🛑 Stopping the Servers

Simply close the command windows that opened for:
- Backend Server
- Frontend Server

## 📂 Project Structure

```
project 1/
├── backend/              # Spring Boot application
│   ├── src/
│   ├── pom.xml
│   └── run files
├── frontend/             # React application
│   ├── src/
│   ├── package.json
│   └── run files
├── run-project.bat      # Windows batch runner
├── run-project.ps1      # PowerShell runner
└── README.md
```

## 🤝 Troubleshooting

**Common Issues:**

1. **"Command not found"** - Make sure Maven and Node.js are installed and in PATH
2. **Port conflicts** - Check if ports 8080 and 5173 are already in use
3. **Compilation errors** - Make sure all dependencies are properly installed

**Verify installation:**
```cmd
java --version
mvn --version
node --version
npm --version
```