# 원본(Astro Cactus) 업데이트 따라가기

이 저장소는 [Astro Cactus](https://github.com/chrismwilliams/astro-theme-cactus) 테마를 기반으로 하고,
원본의 **릴리스 태그를 병합**하는 방식으로 업데이트를 받습니다 (예전 기록: `Merge tag 'v6.11.0' into dev`).
현재 기준은 **v8.3.0** 입니다.

원본과 구조(`content/{posts,notes,tags}`, `/posts/` 주소)를 맞춰 둔 상태라 병합 충돌이 예전보다 적습니다.
시험 병합(v8.3.0 기준)에서 충돌은 약 28건이었고, 절반 이상이 원본이 함께 주는 샘플 글이었습니다.

## 1. 처음 한 번만

```sh
git remote add upstream https://github.com/chrismwilliams/astro-theme-cactus.git
git fetch upstream --tags
```

새 릴리스가 있는지 확인:

```sh
git ls-remote --tags --refs upstream | sed 's#.*refs/tags/##' | sort -V | tail -5
```

## 2. 업데이트 절차

작업은 항상 `dev` 기준 브랜치에서 합니다. 바로 `main`에 병합하지 않습니다.

```sh
git checkout dev && git pull
git checkout -b update/cactus-vX.Y.Z
git fetch upstream --tags
git merge vX.Y.Z            # 충돌이 나면 아래 3번 기준으로 해결
```

충돌을 해결한 뒤:

```sh
pnpm install                # pnpm-lock.yaml 은 직접 고치지 말고 pnpm 으로 다시 만든다
pnpm astro check            # 에러/경고/힌트 0 이어야 한다
pnpm exec biome check       # 에러 0 (원본에도 있는 경고 2건은 무시)
pnpm build                  # 검색 색인(pagefind)까지 만들어지는지 확인
pnpm audit                  # 취약점 확인
```

그다음 `dev` 대상으로 PR을 만들고, `dev` 병합 후 테스트 배포(`preview.yml`)와 Cloudflare 미리보기를 확인한 뒤
`dev` → `main` 으로 올립니다.

## 3. 충돌 났을 때 무엇을 남길까

### 이 저장소 것을 유지 (개성/배포 설정)

| 파일 | 유지할 내용 |
| --- | --- |
| `src/site.config.ts` | 제목, 작성자, 언어(ko-KR), 설명, 날짜 형식, `url` |
| `src/components/layout/Header.astro` | 직접 만든 로고 `<svg>` 블록, 표시 이름 `my_small_recipe_book`, `withBase()` |
| `src/components/layout/Footer.astro` | CC 라이선스 배지, 오리 아이콘(`mdi:duck`), 공백 `{" "}`, `withBase()` |
| `src/components/BaseHead.astro` | `withBase()` 로 감싼 링크들 |
| `src/pages/og-image/_ogMarkup.ts` | 직접 만든 로고 SVG |
| `src/pages/og-image/_cacheUtil.ts` | `CACHE_VERSION` (마크업이 바뀌면 올리기) |
| `src/pages/about.astro`, `src/components/SocialList.astro` | 직접 쓴 내용 |
| `astro.config.ts` | `resolveDeployTarget`, `prefetch: true`, `short_name: "MLRB"` |
| `.nvmrc` | `22` (Cloudflare Pages 빌드가 이 파일을 읽는다) |
| `.github/workflows/*.yml` | `deploy.yml` 의 `package-manager: pnpm@10`, `preview.yml`, `ci.yml` |
| `pnpm-workspace.yaml` | `overrides`, `allowBuilds` |

### 원본 것을 받아들임

위 목록에 없는 `src/` 코드, 스타일, 플러그인, 의존성 버전(`package.json`의 dependencies)은 원본을 따릅니다.
의존성 버전이 충돌하면 원본 값을 쓰고 `pnpm install` 로 lockfile 을 다시 만듭니다.

### 샘플 글

원본이 샘플 글(`test-md`, `markdown-elements`, `testing/*` 등)을 옮기거나 고치면 충돌이 납니다.
- 필요 없는 샘플은 삭제하고 충돌도 삭제로 해결합니다.
- 남길 샘플은 원본과 똑같이 두면 충돌이 나지 않습니다.

## 4. 병합 후 꼭 확인할 것

이 저장소는 GitHub Pages(하위 경로)와 Cloudflare Pages(루트) 두 곳에 배포하므로 아래가 중요합니다.

- 원본이 새로 추가한 링크는 `/…` 처럼 루트 기준이라 GitHub Pages 에서 깨집니다.
  `withBase()` (`src/utils/url.ts`) 로 감싸야 합니다. 남은 곳 찾기:

  ```sh
  grep -rnE 'href="/|href=\{`/|href=\{"/' src --include=*.astro --include=*.ts | grep -v withBase
  ```

  결과가 없어야 합니다.
- 두 배포 조건으로 빌드가 되는지:

  ```sh
  GITHUB_ACTIONS=true GITHUB_REPOSITORY=N-ISOGE/my_small_recipe_book pnpm build   # GitHub Pages
  CF_PAGES=1 pnpm build                                                          # Cloudflare Pages
  ```

  (`site`/`base` 는 `src/utils/deploy-target.ts` 가 환경에서 결정합니다.)
- 원본이 글 주소(`/posts/`)나 콘텐츠 폴더 구조를 또 바꾸지 않았는지.

## 5. 주의

- pnpm 은 10 을 유지합니다. `pnpm@latest`(현재 12)는 `package.json` 의 `pnpm` 설정을 읽지 않거나 공개 24시간 이내 패키지를 막아 설치가 실패할 수 있습니다.
  Cloudflare Pages v3 빌드 이미지는 pnpm 10.11.1, Node 22.16.0 입니다.
- 의존성만 먼저 올리고 싶을 때는 `pnpm update` 후 위 검사를 돌립니다. Dependabot 은 `dev` 대상으로 PR 을 만듭니다.
