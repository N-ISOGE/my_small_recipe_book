import * as React from "react";
import type { HeadFC, PageProps } from "gatsby";
import { Link } from "gatsby";

const Greeting = (props: { name: string }) => {
  return <p> Hi {props.name}!</p>;
};

const IndexPage: React.FC<PageProps> = () => {
  return (
    <main>
      <Link to="/map">지도</Link>

      <h1>Welcome to my Gatsby site!</h1>
      <p>I'm making this by following the Gatsby Tutorial.</p>
      <Greeting name="5" />
      <Greeting name="파폭" />
      <Greeting name="엣지" />

      <Link to="/map">지도</Link>
    </main>
  );
};

export const Head: HeadFC = () => <title>Home Page</title>;

export default IndexPage;
