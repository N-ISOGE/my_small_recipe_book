import TsconfigPathPlugin from "tsconfig-paths-webpack-plugin";

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
