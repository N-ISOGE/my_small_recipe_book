import type { SiteConfig } from "@/types";
import type { AstroExpressiveCodeOptions } from "astro-expressive-code";
const baseUrl = import.meta.env.BASE_URL;

export const siteConfig: SiteConfig = {
	// Used as both a meta property (src/components/BaseHead.astro L:31 + L:49) & the generated satori png (src/pages/og-image/[slug].png.ts)
	author: "N-ISOGE",
	// Date.prototype.toLocaleDateString() parameters, found in src/utils/date.ts.
	date: {
		locale: "ko-KR",
		options: {
			day: "2-digit",
			month: "2-digit",
			year: "numeric",
		},
	},
	// Meta property used as the default description meta property
	description: "작은 창고?",
	// HTML lang property, found in src/layouts/Base.astro L:18
	lang: "ko-KR",
	// Meta property, found in src/components/BaseHead.astro L:42
	ogLocale: "ko_KR",
	// Option to sort posts by updatedDate if set to true (if property exists). Default (false) will sort by publishDate
	sortPostsByUpdatedDate: false,
	// Meta property used to construct the meta title property, found in src/components/BaseHead.astro L:11
	title: "my small recipe book",
	webmentions: {
		link: "https://webmention.io/n-isoge.github.io_my_small_recipe_book_/webmention",
	},
};

// Used to generate links in both the Header & Footer.
export const menuLinks: { title: string; path: string }[] = [
	{
		title: "Home",
		path: `${baseUrl}/`,
	},
	{
		title: "About",
		path: `${baseUrl}/about/`,
	},
	{
		title: "Blog",
		path: `${baseUrl}/post/`,
	},
];

// https://expressive-code.com/reference/configuration/
export const expressiveCodeOptions: AstroExpressiveCodeOptions = {
	styleOverrides: {
		frames: {
			frameBoxShadowCssValue: "none",
		},
		uiLineHeight: "inherit",
		codeFontSize: "0.875rem",
		codeLineHeight: "1.7142857rem",
		borderRadius: "4px",
		codePaddingInline: "1rem",
		codeFontFamily:
			'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;',
	},
	themeCssSelector(theme, { styleVariants }) {
		// If one dark and one light theme are available
		// generate theme CSS selectors compatible with cactus-theme dark mode switch
		if (styleVariants.length >= 2) {
			const baseTheme = styleVariants[0]?.theme;
			const altTheme = styleVariants.find((v) => v.theme.type !== baseTheme?.type)?.theme;
			if (theme === baseTheme || theme === altTheme) return `[data-theme='${theme.type}']`;
		}
		// return default selector
		return `[data-theme="${theme.name}"]`;
	},
	// One dark, one light theme => https://expressive-code.com/guides/themes/#available-themes
	themes: ["dracula", "github-light"],
	useThemedScrollbars: false,
};
