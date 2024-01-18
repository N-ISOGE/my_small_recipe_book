import type { GatsbyNode } from "gatsby";
import TsconfigPathPlugin from "tsconfig-paths-webpack-plugin";

// template gatsbyNode에 있는 것 중 예시로 넣어둠
export const sourceNodes: GatsbyNode["sourceNodes"] = ({
  actions,
  createNodeId,
  createContentDigest,
}) => {
  const { createNode } = actions;
};
// 여기서 typescript type을 선언할 수 있다.

exports.onCreateWebpackConfig = ({ actions }: any) => {
  actions.setWebpackConfig({
    resolve: {
      plugins: [new TsconfigPathPlugin()],
      // alias: {
      //     // "@components": path.resolve(__dirname, "./src/components"),
      //     // "@images": path.resolve(__dirname, "./src/images"),
      //     // "@pages": path.resolve(__dirname, "./src/pages"),
      // }
    },
  });
};
