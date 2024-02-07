import type { APIContext, GetStaticPaths } from "astro";
import { getEntryBySlug } from "astro:content";
import satori, { type SatoriOptions } from "satori";
import { html } from "satori-html";
import { Resvg } from "@resvg/resvg-js";
import { siteConfig } from "@/site-config";
import { getAllPosts, getFormattedDate } from "@/utils";

import RobotoMono from "@/assets/roboto-mono-regular.ttf";
import RobotoMonoBold from "@/assets/roboto-mono-700.ttf";
//
export const prerender = true;

const ogOptions: SatoriOptions = {
    width: 1200,
    height: 630,
    // debug: true,
    fonts: [
        {
            name: "Roboto Mono",
            data: Buffer.from(RobotoMono),
            weight: 400,
            style: "normal",
        },
        {
            name: "Roboto Mono",
            data: Buffer.from(RobotoMonoBold),
            weight: 700,
            style: "normal",
        },
    ],
};

const markup = (title: string, pubDate: string) =>
    html`<div tw="flex flex-col w-full h-full bg-[#1d1f21] text-[#c9cacc]">
        <div tw="flex flex-col flex-1 w-full p-10 justify-center">
            <p tw="text-2xl mb-6">${pubDate}</p>
            <h1 tw="text-6xl font-bold leading-snug text-white">${title}</h1>
        </div>
        <div tw="flex items-center justify-between w-full p-10 border-t border-[#2bbc89] text-xl">
            <div tw="flex items-center">
                <svg
                    height="60"
                    viewBox="0 0 512 512"
                    version="1.1"
                    id="svg1"
                    xml:space="preserve"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:svg="http://www.w3.org/2000/svg"
                >
                    <defs id="defs1" />
                    <g id="backsky">
                        <path
                            style="display:block;fill:#4b5bab;fill-opacity:1"
                            d="M 67.655584,113.92327 281.97101,11.785166 379.30776,58.489344 378.87127,239.63171 136.11173,352.77937 66.975611,319.13724 Z"
                            id="path1"
                        />
                        <path
                            style="display:block;fill:#4da6ff;fill-opacity:1"
                            d="m 135.80308,275.92717 -0.61728,96.60538 39.1977,19.44453 241.05047,-123.76599 -0.30864,-87.03743 -36.41992,-19.13589 z"
                            id="path2"
                        />
                        <path
                            style="display:block;fill:#ffffff;fill-opacity:1"
                            d="m 312.12086,150.18608 -25.69982,-12.06817 51.23481,-26.08037 55.5558,28.39519 0.92593,55.24717 -55.5558,28.39519 -26.45683,-12.17328"
                            id="path3"
                        />
                        <path
                            style="display:block;fill:#ffffff;fill-opacity:1"
                            d="m 199.07497,154.32168 55.86445,-29.32112 55.86445,25.92605 v 61.72867 l -54.62987,28.39519 -23.19442,-11.33042 0.0409,-27.23026 -34.3446,-15.6624 z"
                            id="path4"
                        />
                        <path
                            style="display:block;fill:#ffffff;fill-opacity:1"
                            d="m 121.78005,205.80392 55.65218,-26.84399 53.68797,24.22507 0.43649,54.77919 -54.56095,26.18926 -54.99744,-26.62574 z"
                            id="path44"
                        />
                    </g>
                </svg>
                <p tw="ml-3 font-semibold">${siteConfig.title}</p>
            </div>
            <p>by ${siteConfig.author}</p>
        </div>
    </div>`;

export async function GET({ params: { slug } }: APIContext) {
    const post = await getEntryBySlug("post", slug!);
    const title = post?.data.title ?? siteConfig.title;
    const postDate = getFormattedDate(
        post?.data.updatedDate ?? post?.data.publishDate ?? Date.now(),
        {
            weekday: "long",
            month: "long",
        },
    );
    const svg = await satori(markup(title, postDate), ogOptions);
    const png = new Resvg(svg).render().asPng();
    return new Response(png, {
        headers: {
            "Content-Type": "image/png",
            "Cache-Control": "public, max-age=31536000, immutable",
        },
    });
}

export const getStaticPaths: GetStaticPaths = async () => {
    const posts = await getAllPosts();
    return posts.filter(({ data }) => !data.ogImage).map(({ slug }) => ({ params: { slug } }));
};
