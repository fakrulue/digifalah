@echo off
echo Starting DigiFalah Laravel...
start cmd /k "cd /d %~dp0 && php artisan serve --port=8001"
start cmd /k "cd /d %~dp0 && npm run dev"
echo.
echo App: http://localhost:8001
echo Admin: http://localhost:8001/admin
echo Login: admin@digifalah.com / password
pause
