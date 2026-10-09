# CLAUDE.md

Astro Cactus 테마 기반 블로그입니다. GitHub Pages(`https://n-isoge.github.io/my_small_recipe_book/`, 하위 경로)와
Cloudflare Pages(루트) 두 곳에 배포합니다. 설명은 한국어로 합니다.

## Git

- 작업은 `dev` 기준 브랜치에서 하고 PR 도 `dev` 대상으로 만듭니다. `main` 에 병합하면 GitHub Pages 운영 배포(`deploy.yml`)와
  Cloudflare 운영 빌드가 시작되므로, 요청 없이 `main` 에 병합하거나 푸시하지 않습니다.
- 새 브랜치 이름은 내용을 알 수 있게 `<종류>/<영문-소문자-하이픈-요약>` 으로 짓습니다.
  종류는 `feat`, `fix`, `docs`, `chore`, `update`(원본 Cactus 병합) 입니다. 예: `docs/upstream-update-guide`.
- 커밋 메시지는 한국어로 첫 줄에 요약, 이어서 변경 이유와 확인한 내용을 적습니다.
- 커밋, PR, 코멘트에 세션 ID 나 세션 링크를 남기지 않습니다 (`.claude/settings.json` 의 `attribution` 설정).
- PR 은 요청했을 때만 만들고 `.github/pull_request_template.md` 구조를 따릅니다.

## 도구

- Node 22 (`.nvmrc`; Cloudflare Pages 빌드가 이 파일을 읽으므로 올리지 않음), pnpm **10**.
  `pnpm@latest`(현재 12)는 `package.json` 의 `pnpm` 설정을 읽지 않고 공개 24시간 이내 패키지를 막으므로 쓰지 않습니다.
  pnpm 설정(`overrides`, `allowBuilds`)은 `pnpm-workspace.yaml` 에 있습니다.
- `pnpm-lock.yaml` 은 직접 고치지 말고 `pnpm install` 로 다시 만듭니다.
- 명령: `pnpm dev`, `pnpm build`(= `astro build` + pagefind), `pnpm astro check`, `pnpm exec biome check`.
  `pnpm format`(prettier)은 블로그 글까지 건드릴 수 있어 쓰지 않습니다.

## PR 전 확인

- `pnpm astro check` 에러/경고/힌트 0, `pnpm exec biome check` 에러 0 (원본에도 있는 경고 2건은 무시).
- 배포 두 조건으로 빌드:
  `GITHUB_ACTIONS=true GITHUB_REPOSITORY=N-ISOGE/my_small_recipe_book pnpm build` / `CF_PAGES=1 pnpm build`.
  `site`/`base` 는 `src/utils/deploy-target.ts` 가 환경에서 결정합니다 (`SITE_URL`, `BASE_PATH` 로 덮어쓸 수 있음).
- `src/` 의 루트 기준 링크(`/…`)는 GitHub Pages 에서 깨지므로 `withBase()`(`src/utils/url.ts`)로 만듭니다.
  `.env` 는 커밋하지 않습니다.

## 콘텐츠

- 글 `content/posts/`(주소 `/posts/…`), 노트 `content/notes/`, 태그 소개 `content/tags/`.
- 글 본문의 링크는 상대 경로(`../다른-글/`)로 씁니다. 자세한 문법 차이와 프런트매터는 `docs/obsidian.md` 를 봅니다.
- 노트의 `publishDate` 는 따옴표로 감싼 시간대 포함 ISO 값이어야 빌드됩니다.

## 원본(Astro Cactus) 따라가기

- 원본 릴리스 태그를 `dev` 기준 `update/…` 브랜치에서 병합합니다. 절차와 충돌 시 유지할 파일은 `docs/upstream-update.md`.
- 직접 만든 로고, 푸터, 설정 값은 이 저장소의 개성이므로 원본에 맞춰 되돌리지 않습니다.
