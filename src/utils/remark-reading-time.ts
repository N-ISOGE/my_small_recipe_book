import getReadingTime from "reading-time";
import {toString} from "mdast-util-to-string";
import type {RemarkPlugin} from "@astrojs/markdown-remark";

export const remarkReadingTime: RemarkPlugin = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return function (tree: unknown, {data}) {
    const textOnPage = toString(tree);
    const readingTime = getReadingTime(textOnPage);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    data.astro.frontmatter.minutesRead = readingTime.text;
  };
};
