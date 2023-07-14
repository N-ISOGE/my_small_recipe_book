import * as React from "react";
import type { HeadFC, PageProps } from "gatsby";

const MapPage: React.FC<PageProps> = () => {
  return (
    <main>
      <h1>개요</h1>
      <p>뭐 올릴지 정하는 중</p>
    </main>
  );
};

export const Head: HeadFC = () => <title>Map</title>;

export default MapPage;
