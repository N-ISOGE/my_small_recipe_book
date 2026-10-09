import rss from "@astrojs/rss";
import { getAllPosts } from "@/data/post";
import { siteConfig } from "@/site.config";
import { withBase } from "@/utils/url";

export const GET = async () => {
	const posts = await getAllPosts();

	return rss({
		title: siteConfig.title,
		description: siteConfig.description,
		// include `base` so the channel link and the relative item links stay under a sub path (GitHub Pages)
		site: new URL(withBase("/"), import.meta.env.SITE),
		items: posts.map((post) => ({
			title: post.data.title,
			description: post.data.description,
			pubDate: post.data.publishDate,
			link: `post/${post.id}/`,
		})),
	});
};
