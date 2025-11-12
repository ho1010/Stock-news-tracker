# GitHub Secrets 설정 가이드

이 프로젝트를 GitHub Pages에 배포하려면 GitHub Personal Access Token을 GitHub Secrets에 추가해야 합니다.

## GitHub Personal Access Token 생성 및 설정

### 1. GitHub Personal Access Token 생성

1. GitHub에 로그인합니다.
2. 우측 상단 프로필 아이콘을 클릭하고 **Settings**로 이동합니다.
3. 왼쪽 사이드바에서 **Developer settings**를 클릭합니다.
4. **Personal access tokens** → **Tokens (classic)**를 선택합니다.
5. **Generate new token** → **Generate new token (classic)**을 클릭합니다.
6. 토큰 이름을 입력하고 (예: "Stock News Tracker Deploy") 다음 권한을 선택합니다:
   - `repo` (전체 저장소 접근)
   - `workflow` (GitHub Actions 워크플로 수정)
7. **Generate token**을 클릭합니다.
8. 생성된 토큰을 복사합니다. (다시 볼 수 없으므로 안전한 곳에 저장하세요)

### 2. GitHub Secrets에 토큰 추가

1. GitHub 저장소 페이지로 이동합니다.
2. **Settings** 탭을 클릭합니다.
3. 왼쪽 사이드바에서 **Secrets and variables** → **Actions**를 선택합니다.
4. **New repository secret**을 클릭합니다.
5. 다음 정보를 입력합니다:
   - **Name**: `GH_TOKEN` (또는 원하는 이름)
   - **Secret**: 위에서 생성한 Personal Access Token을 붙여넣습니다.
6. **Add secret**을 클릭합니다.

### 3. GitHub Pages 설정

1. 저장소의 **Settings** → **Pages**로 이동합니다.
2. **Source**를 "GitHub Actions"로 설정합니다.
3. 저장합니다.

### 4. 워크플로에서 토큰 사용 (필요한 경우)

현재 워크플로는 GitHub Actions의 기본 권한을 사용하므로 별도의 토큰이 필요하지 않습니다. 
만약 추가적인 GitHub API 호출이 필요한 경우, 워크플로 파일에서 다음과 같이 사용할 수 있습니다:

```yaml
- name: Use GitHub API
  env:
    GITHUB_TOKEN: ${{ secrets.GH_TOKEN }}
  run: |
    # GitHub API 호출 예시
    curl -H "Authorization: token $GITHUB_TOKEN" https://api.github.com/...
```

## 보안 주의사항

⚠️ **중요**: 
- Personal Access Token을 코드나 설정 파일에 직접 작성하지 마세요.
- 토큰이 노출되면 즉시 GitHub에서 토큰을 삭제하고 새로 생성하세요.
- `.gitignore` 파일에 `.env` 파일이 포함되어 있는지 확인하세요.

