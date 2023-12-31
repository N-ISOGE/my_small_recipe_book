import type { GatsbyConfig } from "gatsby";
import adapter from "gatsby-adapter-netlify";
import path from "path";

module.exports = {
  adapter: adapter({
    excludeDatastoreFromEngineFunction: false,
  }),
  pathPrefix: "/my_small_recipe_book",
};

const config: GatsbyConfig = {
  siteMetadata: {
    title: "My small recipe book"
  },
  // More easily incorporate content into your pages through automatic TypeScript type generation and better GraphQL IntelliSense.
  // If you use VSCode you can also use the GraphQL plugin
  // Learn more at: https://gatsby.dev/graphql-typegen
  graphqlTypegen: true,
  plugins: [
    "gatsby-plugin-sitemap",
    "gatsby-plugin-tsconfig-paths",
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        icon: "src/images/icon.png",
      },
    },
    "gatsby-plugin-styled-components",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "pages",
        path: "./src/pages/",
      },
      __key: "pages",
    },
    {
      resolve: "gatsby-plugin-page-creator",
      options: {
        path: "./src/pages/",
      },
      __key: "pages",
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "blog",
        path: "./blog/",
      },
      __key: "blog",
    },
    {
      resolve: "gatsby-plugin-page-creator",
      options: {
        path: "./blog/",
      },
      __key: "blog",
    },
    {
      resolve: "gatsby-plugin-mdx",
      options: {
        extensions: [".mdx", ".md"],
      },
    },
    {
      resolve: "gatsby-plugin-root-import",
      options: {
        "@components": path.join(__dirname, "src/components"),
        "@pages": path.join(__dirname, "src/pages"),
        "@images": path.join(__dirname, "src/images"),
      },
    },
    "gatsby-plugin-image",
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    "gatsby-plugin-dts-css-modules",
    "gatsby-plugin-sass",
  ],
};

export default config;
