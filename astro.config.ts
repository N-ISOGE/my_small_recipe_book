import { defineConfig } from "astro/config";
import fs from "fs";
import mdx from "@astrojs/mdx";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";
import remarkUnwrapImages from "remark-unwrap-images";
import rehypeExternalLinks from "rehype-external-links";
import { remarkReadingTime } from "./src/utils/remark-reading-time";
import expressiveCode from "astro-expressive-code";
import { expressiveCodeOptions } from "./src/site.config";
import icon from "astro-icon";
//
// import cloudflare from "@astrojs/cloudflare";

// env vars for github pages
const owner = import.meta.env.VITE_GITHUB_REPOSITORY_OWNER;
const repoName = import.meta.env.VITE_GITHUB_REPOSITORY;
const baseUrl = getBaseUrl();

// https://astro.build/config
export default defineConfig({
    site: "https://n-isoge.github.io",
    base: baseUrl,
    markdown: {
        remarkPlugins: [remarkUnwrapImages, remarkReadingTime],
        rehypePlugins: [
            [
                rehypeExternalLinks,
                {
                    target: "_blank",
                    rel: ["nofollow, noopener, noreferrer"],
                },
            ],
        ],
        remarkRehype: {
            footnoteLabelProperties: {
                className: [""],
            },
        },
    },
    integrations: [
        mdx(),
        tailwind({
            applyBaseStyles: false,
        }),
        sitemap(),
        icon(),
        expressiveCode(expressiveCodeOptions),
    ],
    image: {
        domains: ["webmention.io"],
    },
    // https://docs.astro.build/en/guides/prefetch/
    prefetch: true,
    vite: {
        plugins: [rawFonts([".ttf"])],
        optimizeDeps: {
            exclude: ["@resvg/resvg-js"],
        },
    },
    // output: "hybrid",
    // adapter: cloudflare(),
});

function rawFonts(ext: Array<string>) {
    return {
        name: "vite-plugin-raw-fonts",
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore:next-line
        transform(_, id) {
            if (ext.some((e) => id.endsWith(e))) {
                const buffer = fs.readFileSync(id);
                return {
                    code: `export default ${JSON.stringify(buffer)}`,
                    map: null,
                };
            }
        },
    };
}

function getBaseUrl() {
    if (typeof owner === "string" && typeof repoName === "string") {
        return repoName.substring(owner.length);
    }
    return ".";
}
