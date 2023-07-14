import * as React from "react";
import type { HeadFC, PageProps } from "gatsby";
import { Link } from "gatsby";

const MapPage: React.FC<PageProps> = () => {
  return (
    <main>
      <Link to="/">대문</Link>

      <h1>개요</h1>
      <p>뭐 올릴지 정하는 중</p>

      <Link to="/">대문</Link>
    </main>
  );
};

export const Head: HeadFC = () => <title>Map</title>;

export default MapPage;
