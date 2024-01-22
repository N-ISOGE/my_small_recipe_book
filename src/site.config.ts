import type { SiteConfig } from "@/types";
const baseUrl = import.meta.env.BASE_URL;

export const siteConfig: SiteConfig = {
	// Used as both a meta property (src/components/BaseHead.astro L:31 + L:49) & the generated satori png (src/pages/og-image/[slug].png.ts)
	author: "sang hyeon, son",
	// Meta property used to construct the meta title property, found in src/components/BaseHead.astro L:11
	title: "my small recipe book",
	// Meta property used as the default description meta property
	description: "작은 창고?",
	// HTML lang property, found in src/layouts/Base.astro L:18
	lang: "ko-KR",
	// Meta property, found in src/components/BaseHead.astro L:42
	ogLocale: "ko-KR",
	// Date.prototype.toLocaleDateString() parameters, found in src/utils/date.ts.
	date: {
		locale: "ko-KR",
		options: {
			day: "numeric",
			month: "short",
			year: "numeric",
		},
	},
	webmentions: {
		link: "",
	},
};

// Used to generate links in both the Header & Footer.
export const menuLinks: Array<{ title: string; path: string }> = [
	{
		title: "Home",
		path: " ",
	},
	{
		title: "About",
		path: `${baseUrl}/about/`,
	},
	{
		title: "Blog",
		path: `${baseUrl}/posts/`,
	},
];
