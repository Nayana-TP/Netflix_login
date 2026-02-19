@echo off
echo Starting TMDB Backend Server...
echo.
echo The server will start in fallback mode (in-memory storage)
echo This means data will be lost when the server restarts
echo.
cd backend
node server-fallback.js
pause
