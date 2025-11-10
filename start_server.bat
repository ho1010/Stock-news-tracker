@echo off
@echo Starting server for mobile access...
echo.
echo Local access: http://localhost:8000/stock_news_tracker.html
for /f %%i in ('powershell -NoProfile -Command "(Get-NetIPAddress -AddressFamily IPv4 ^| ?{ $_.IPAddress -match '^(10\.|192\.168\.|172\.(1[6-9]|2[0-9]|3[0-1])\.)' } ^| Select -First 1 -ExpandProperty IPAddress)"') do set ip=%%i
if not defined ip for /f %%i in ('powershell -NoProfile -Command "(Get-NetIPAddress -AddressFamily IPv4 ^| Select -First 1 -ExpandProperty IPAddress)"') do set ip=%%i
if defined ip (
  echo Mobile access: http://%ip%:8000/stock_news_tracker.html
  echo Mobile guide: http://%ip%:8000/mobile_access.html
) else (
  echo Mobile access: ^<your LAN IP^>:8000/stock_news_tracker.html
  echo Mobile guide: ^<your LAN IP^>:8000/mobile_access.html
)
echo.
echo Press Ctrl+C to stop the server
echo.
npx http-server "E:\14 US stock news tracker" -p 8000 -a 0.0.0.0 --cors
pause
