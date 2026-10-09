/**
 * Prefixes a root-relative path with the configured `base` (see src/utils/deploy-target.ts).
 *
 * Works for a site served from the domain root (`base: "/"`) as well as from a sub path such as
 * GitHub Pages project sites (`base: "/my_small_recipe_book"`), and never produces `//` or `/./`.
 *
 *   withBase("/about/")  -> "/about/"                        (Cloudflare Pages)
 *   withBase("/about/")  -> "/my_small_recipe_book/about/"   (GitHub Pages)
 *   withBase()           -> "/" or "/my_small_recipe_book/"
 */
export function withBase(path = "/"): string {
	const base = import.meta.env.BASE_URL.replace(/\/+$/, "");
	return `${base}/${path.replace(/^\/+/, "")}`;
}

/** True if `pathname` (e.g. `Astro.url.pathname`) is the given site path, ignoring a trailing slash. */
export function isCurrentPath(pathname: string, path: string): boolean {
	const strip = (value: string) => value.replace(/\/+$/, "");
	return strip(pathname) === strip(withBase(path));
}
