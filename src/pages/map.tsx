import * as React from "react";
import type { HeadFC, PageProps } from "gatsby";
import Layout from "../components/layout";

const MapPage: React.FC<PageProps> = () => {
  return (
    <Layout pageTitle="개요">
      <p>뭐 올릴지 정하는 중</p>
    </Layout>
  );
};

export const Head: HeadFC = () => <title>Map</title>;

export default MapPage;
