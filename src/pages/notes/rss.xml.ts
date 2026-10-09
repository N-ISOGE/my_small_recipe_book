import { getCollection } from "astro:content";
import rss from "@astrojs/rss";
import { siteConfig } from "@/site.config";
import { withBase } from "@/utils/url";

export const GET = async () => {
	const notes = await getCollection("note");

	return rss({
		title: siteConfig.title,
		description: siteConfig.description,
		// include `base` so the channel link and the relative item links stay under a sub path (GitHub Pages)
		site: new URL(withBase("/"), import.meta.env.SITE),
		items: notes.map((note) => ({
			title: note.data.title,
			pubDate: note.data.publishDate,
			link: `notes/${note.id}/`,
		})),
	});
};
