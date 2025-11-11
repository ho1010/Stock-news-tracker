Write-Host "Starting server for mobile access..." -ForegroundColor Green
Write-Host ""
Write-Host "Local access: http://localhost:8000/stock_news_tracker.html" -ForegroundColor Cyan

# Try to detect a private LAN IPv4 (10.x, 192.168.x, 172.16-31.x)
$ip = (Get-NetIPAddress -AddressFamily IPv4 | Where-Object {
    $_.IPAddress -match '^(10\.|192\.168\.|172\.(1[6-9]|2[0-9]|3[0-1])\.)'
} | Select-Object -First 1 -ExpandProperty IPAddress)
if (-not $ip) {
    $ip = (Get-NetIPAddress -AddressFamily IPv4 | Select-Object -First 1 -ExpandProperty IPAddress)
}

if ($ip) {
    Write-Host "Mobile access: http://$ip:8000/stock_news_tracker.html" -ForegroundColor Yellow
    Write-Host "Mobile guide: http://$ip:8000/mobile_access.html" -ForegroundColor Magenta
} else {
    Write-Host "Mobile access: <your LAN IP>:8000/stock_news_tracker.html" -ForegroundColor Yellow
    Write-Host "Mobile guide: <your LAN IP>:8000/mobile_access.html" -ForegroundColor Magenta
}

Write-Host ""
Write-Host "Press Ctrl+C to stop the server" -ForegroundColor Red
Write-Host ""
npx http-server "E:\14 US stock news tracker" -p 8000 -a 0.0.0.0 --cors
