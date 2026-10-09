<div align="center">
  <img alt="logo" src="https://github.com/N-ISOGE/my_small_recipe_book/blob/e39325dbfd03130e18c609d336cef79ecfd355ac/public/512x512.png/?raw=true" width="70" />
</div>
<h1 align="center">
  my_small_recipe_book
</h1>

## 목록

-   [Astro Cactus theme](https://github.com/chrismwilliams/astro-theme-cactus/) v8.3.0 기반으로 적용중

## 배포

Cloudflare Pages와 GitHub Pages 두 곳에 배포하고, 빌드되는 환경에 따라 `site`/`base`가 자동으로 정해집니다
(`src/utils/deploy-target.ts`, 링크는 `src/utils/url.ts`의 `withBase()`로 만듭니다).

| 배포처           | 주소                                           | base                 | 판별 방법                              |
| ---------------- | ---------------------------------------------- | -------------------- | -------------------------------------- |
| GitHub Pages     | `https://<owner>.github.io/<repo>/`            | `/<repo>`            | GitHub Actions (`GITHUB_ACTIONS`)      |
| Cloudflare Pages | `https://<project>.pages.dev` 또는 커스텀 도메인 | `/`                  | Cloudflare 빌드 (`CF_PAGES`)           |
| 로컬             | `http://localhost:4321`                        | `/`                  | 그 외                                  |

-   Cloudflare Pages: 빌드 명령 `pnpm build`, 출력 디렉터리 `dist`.
    canonical, sitemap, RSS에 쓰이는 대표 주소는 환경변수 `SITE_URL`(예: `https://example.pages.dev`)로 지정하세요.
    지정하지 않으면 배포마다 달라지는 `CF_PAGES_URL`을 사용합니다.
-   직접 지정하고 싶을 때는 `SITE_URL`, `BASE_PATH` 환경변수가 항상 우선합니다.
-   GitHub Pages 배포는 `.github/workflows/deploy.yml`(main), 미리보기는 `preview.yml`(dev)입니다.

## License

MIT

These blog posts are licensed under a
[Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License][cc-by-nc-sa].

Shield: [![CC BY-NC-SA 4.0][cc-by-nc-sa-shield]][cc-by-nc-sa]

[![CC BY-NC-SA 4.0][cc-by-nc-sa-image]][cc-by-nc-sa]

[cc-by-nc-sa]: http://creativecommons.org/licenses/by-nc-sa/4.0/
[cc-by-nc-sa-image]: https://licensebuttons.net/l/by-nc-sa/4.0/88x31.png
[cc-by-nc-sa-shield]: https://img.shields.io/badge/License-CC%20BY--NC--SA%204.0-lightgrey.svg
