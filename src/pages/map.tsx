import * as React from "react";
import type { HeadFC, PageProps } from "gatsby";
import Layout from "@components/layout";
import Seo from "@components/seo";
import PostTemplate from "@components/postTemplate";

const MapPage: React.FC<PageProps> = () => {
  return (
    <Layout pageTitle={"개요"} tag={"map"}>
      <p>뭐 올릴지 정하는 중</p>
    </Layout>
  );
};

export const Head: HeadFC = () => <Seo title="Map"></Seo>;

export default MapPage;
