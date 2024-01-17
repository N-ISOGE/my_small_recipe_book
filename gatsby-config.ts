import type { GatsbyConfig } from "gatsby";
import adapter from "gatsby-adapter-netlify";
import path from "path";

const config: GatsbyConfig = {
  siteMetadata: {
    siteUrl:"https://n-isoge.github.io/my_small_recipe_book",
    title: "My small recipe book",
  },
  // pathPrefix: `/my_small_recipe_book`,
  adapter: adapter({
    excludeDatastoreFromEngineFunction: false,
  }) ,
  // More easily incorporate content into your pages through automatic TypeScript type generation and better GraphQL IntelliSense.
  // If you use VSCode you can also use the GraphQL plugin
  // Learn more at: https://gatsby.dev/graphql-typegen
  graphqlTypegen: true,
  plugins: [
    "gatsby-plugin-sitemap",
    "gatsby-plugin-styled-components",
    // "gatsby-plugin-typescript",
    "gatsby-plugin-tsconfig-paths",
    // image
    "gatsby-plugin-image",
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    // css
    "gatsby-plugin-dts-css-modules",
    "gatsby-plugin-sass",
    //
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        name: "My small recipe book",
        short_name: "N.ISOGE recipes",
        icon: "src/images/icon.png",
      },
    },
    //
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
    //
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
        path: "./src/blog/",
      },
      __key: "blog",
    },
    {
      resolve: "gatsby-plugin-page-creator",
      options: {
        path: "./src/blog/",
      },
      __key: "blog",
    },
  ],
};

export default config;
