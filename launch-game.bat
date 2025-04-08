@echo off
echo Starting Adventure Game Server...
start python -m http.server 8000
timeout /t 2
start http://localhost:8000
echo Server running at http://localhost:8000
echo Press Ctrl+C to stop the server
pause