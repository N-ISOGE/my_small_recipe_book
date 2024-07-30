export type SiteConfig = {
    author: string;
    date: {
        locale: string | string[] | undefined;
        options: Intl.DateTimeFormatOptions;
    };
    description: string;
    lang: string;
    ogLocale: string;
    sortPostsByUpdatedDate: boolean;
    title: string;
    webmentions?: {
        link: string;
        pingback?: string;
    };
};

export type PaginationLink = {
    url: string;
    text?: string;
    srLabel?: string;
};

export type SiteMeta = {
    title: string;
    description?: string;
    ogImage?: string | undefined;
    articleDate?: string | undefined;
};

/** Webmentions */
export type WebmentionsFeed = {
    type: string;
    name: string;
    children: WebmentionsChildren[];
};

export type WebmentionsCache = {
    lastFetched: string | null;
    children: WebmentionsChildren[];
};

export type WebmentionsChildren = {
    author: Author | null;
    content?: Content | null;
    "mention-of": string;
    name?: string | null;
    photo?: string[] | null;
    published?: string | null;
    rels?: Rels | null;
    summary?: Summary | null;
    syndication?: string[] | null;
    type: string;
    url: string;
    "wm-id": number;
    "wm-private": boolean;
    "wm-property": string;
    "wm-protocol": string;
    "wm-received": string;
    "wm-source": string;
    "wm-target": string;
};

export type Author = {
    type: string;
    name: string;
    photo: string;
    url: string;
};

export type Content = {
    "content-type": string;
    value: string;
    html: string;
    text: string;
};

export type Rels = {
    canonical: string;
};

export type Summary = {
    "content-type": string;
    value: string;
};
