# 🔧 Troubleshooting Guide - Network Error Fix

## 🎯 Common "Network Error" Solutions

### 1. **Verify Both Servers Are Running**

**Check Backend (Port 8080):**
- Open browser and go to: `http://localhost:8080/api/health`
- You should see: `{"status":"UP","timestamp":"...","service":"Habit Tracker API"}`

**Check Frontend (Port 5173):**
- Open browser and go to: `http://localhost:5173`
- You should see the Habit Tracker interface

### 2. **Restart Both Servers**

**Stop current servers:**
- Close the backend command window
- Close the frontend command window

**Start fresh:**
```cmd
# Option 1: Use the run script
run-project.bat

# Option 2: Manual start
cd backend
mvn spring-boot:run

# In new terminal:
cd frontend  
npm run dev
```

### 3. **Check for Port Conflicts**

```cmd
# Check what's using port 8080
netstat -ano | findstr :8080

# Check what's using port 5173
netstat -ano | findstr :5173
```

If ports are in use, either:
- Kill the processes using those ports, or
- Change the ports in configuration files

### 4. **Test API Connectivity**

Run the test script:
```cmd
test-connectivity.bat
```

This will show you exactly which services are accessible.

### 5. **Browser Developer Tools**

1. Open your browser's Developer Tools (F12)
2. Go to the Network tab
3. Refresh the habit tracker page
4. Look for failed requests (they'll be red)
5. Check the error details

### 6. **Common Fixes**

**Firewall Issues:**
- Temporarily disable Windows Firewall to test
- Add exceptions for ports 8080 and 5173

**CORS Issues:**
- Already fixed with global CORS configuration
- Should work with `http://localhost:5173` origin

**Database Issues:**
- Backend uses H2 in-memory database
- No external database setup required
- Data resets when backend restarts

### 7. **Quick Verification Steps**

1. **Backend Test:**
   ```cmd
   curl http://localhost:8080/api/health
   ```

2. **Frontend Test:**
   ```cmd
   curl http://localhost:5173
   ```

3. **API Test:**
   ```cmd
   curl http://localhost:8080/api/habits
   ```

### 8. **If Nothing Works**

Try these nuclear options:

**Clean Build:**
```cmd
cd backend
mvn clean
mvn compile
mvn spring-boot:run
```

**Frontend Reset:**
```cmd
cd frontend
rm -rf node_modules
npm install
npm run dev
```

**Complete Project Reset:**
1. Close all terminals
2. Delete `backend/target` folder
3. Delete `frontend/node_modules` folder
4. Run `run-project.bat` again

## 📞 Still Having Issues?

Check the browser console (F12) for specific error messages and share them for more targeted help.