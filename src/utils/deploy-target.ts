/**
 * Resolves the `site` and `base` Astro options for the platform that is building the site.
 *
 * The Cactus theme assumes it is served from the root of a domain, which fits Cloudflare Pages.
 * GitHub Pages project sites are served from a sub path (https://<owner>.github.io/<repo>/), so
 * `base` has to be set there or every root-relative link, asset and feed breaks.
 *
 * Order of precedence:
 *  1. `SITE_URL` / `BASE_PATH` environment variables (explicit override, any platform)
 *  2. GitHub Actions (`GITHUB_ACTIONS` + `GITHUB_REPOSITORY`) -> GitHub Pages
 *  3. Cloudflare Pages (`CF_PAGES`) -> served from the domain root
 *  4. Anything else (local dev, `astro preview`) -> served from the domain root
 *
 * Note: this file is imported by astro.config.ts, so it must not depend on Astro virtual modules.
 */

export interface DeployTarget {
	/** Origin only, no trailing slash, e.g. `https://n-isoge.github.io` */
	site: string;
	/** Either `/` or a path with a leading slash and no trailing slash, e.g. `/my_small_recipe_book` */
	base: string;
	/** Which rule matched, handy for logging. */
	platform: "override" | "github-pages" | "cloudflare-pages" | "default";
}

type Env = Record<string, string | undefined>;

export function normalizeBase(base: string | undefined): string {
	const trimmed = (base ?? "").trim().replace(/^\/+|\/+$/g, "");
	return trimmed === "" ? "/" : `/${trimmed}`;
}

export function normalizeSite(site: string): string {
	return site.trim().replace(/\/+$/, "");
}

export function resolveDeployTarget(env: Env, fallbackSite: string): DeployTarget {
	const siteOverride = env.SITE_URL?.trim();
	const baseOverride = env.BASE_PATH;

	let target: DeployTarget;

	const repository = env.GITHUB_REPOSITORY;
	if (env.GITHUB_ACTIONS === "true" && repository?.includes("/")) {
		const [owner = "", repo = ""] = repository.split("/");
		// A user/organisation site (<owner>.github.io) lives at the domain root.
		const isUserSite = repo.toLowerCase() === `${owner.toLowerCase()}.github.io`;
		target = {
			site: `https://${owner.toLowerCase()}.github.io`,
			base: isUserSite ? "/" : normalizeBase(repo),
			platform: "github-pages",
		};
	} else if (env.CF_PAGES === "1") {
		// CF_PAGES_URL is the URL of this particular deployment. Set SITE_URL in the Cloudflare
		// project to get a stable canonical URL for production builds.
		target = {
			site: normalizeSite(env.CF_PAGES_URL ?? fallbackSite),
			base: "/",
			platform: "cloudflare-pages",
		};
	} else {
		target = { site: normalizeSite(fallbackSite), base: "/", platform: "default" };
	}

	if (siteOverride || baseOverride !== undefined) {
		target = {
			site: siteOverride ? normalizeSite(siteOverride) : target.site,
			base: baseOverride !== undefined ? normalizeBase(baseOverride) : target.base,
			platform: "override",
		};
	}

	return target;
}
