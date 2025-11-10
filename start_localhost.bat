@echo off
chcp 65001 >nul
echo ========================================
echo  미국 주식 뉴스 트래커 - 로컬 서버 시작
echo ========================================
echo.
cd /d "%~dp0"
echo 서버를 시작하는 중...
echo.
echo 접속 주소:
echo   http://localhost:8000/stock_news_tracker.html
echo.
echo 서버를 중지하려면 Ctrl+C를 누르세요.
echo.
node server.js
pause

