# Stock News Tracker

미국 주식 뉴스를 카테고리별로 모아 보여주는 정적 웹 애플리케이션입니다. 로컬 환경에서 간단하게 실행할 수 있고, GitHub Pages를 통해 무료로 배포할 수 있습니다.

## 주요 기능

- 섹터별/티커별로 최신 뉴스 검색 및 필터링
- 사용자 지정 종목 관리 및 로컬 저장소 저장
- 실시간 알림 설정(데스크톱, 사운드, 진동)
- 모바일 접속 안내 페이지 제공

## 로컬 실행 방법

1. 레포지토리를 클론하거나 다운로드합니다.
2. PowerShell 또는 터미널에서 프로젝트 루트(`Stock-news-tracker`)로 이동합니다.
3. 다음 명령으로 로컬 서버를 실행합니다.
   ```powershell
   node server.js
   ```
4. 브라우저에서 `http://localhost:8000/stock_news_tracker.html` 에 접속합니다.

> `start_server.bat` 또는 `start_server.ps1` 스크립트를 실행해도 동일한 서버가 실행됩니다.

## GitHub Pages 배포 방법

GitHub Pages를 사용하면 정적 파일을 자동으로 배포할 수 있습니다. 이 레포지토리에는 GitHub Actions 워크플로(`.github/workflows/deploy.yml`)가 포함되어 있습니다.

1. 원격 저장소의 기본 브랜치를 `main`으로 설정합니다.
2. 레포지토리를 GitHub에 푸시한 뒤, GitHub 저장소 페이지에서 **Settings → Pages** 로 이동합니다.
3. **Source** 를 “GitHub Actions”로 설정합니다.
4. `main` 브랜치에 변경사항을 푸시하거나, **Actions** 탭에서 `Deploy to GitHub Pages` 워크플로를 수동으로 실행합니다.
5. 배포가 완료되면 워크플로 로그와 **Pages** 설정 화면에서 사이트 주소를 확인할 수 있습니다.

> GitHub Pages의 진입점은 `index.html`이며, 메인 화면인 `stock_news_tracker.html` 로 자동 리다이렉트됩니다.

## 파일 구조

- `index.html` – GitHub Pages용 진입점 (자동 리다이렉트)
- `stock_news_tracker.html` – 메인 애플리케이션 페이지
- `mobile_access.html` – 모바일 접속 안내 페이지
- `server.js` – 로컬 개발용 간단한 정적 파일 서버
- `start_server.*` – 서버 실행 스크립트 (Windows PowerShell/Batch)

## 이슈 및 기여

버그나 개선 제안은 GitHub Issues에 등록해주세요. Pull Request도 환영합니다.

