import * as React from "react";
import type { HeadFC, PageProps } from "gatsby";
import { Link } from "gatsby";
import Layout from "../components/layout";

const Greeting = (props: { name: string }) => {
  return <p> Hi {props.name}!</p>;
};

// const IndexPage: React.FC<PageProps> = () => {
//   return (
//     <main>
//       <Link to="/map">지도</Link>

//       <h1>Welcome to my Gatsby site!</h1>
//       <p>I'm making this by following the Gatsby Tutorial.</p>
//       <Greeting name="5" />
//       <Greeting name="파폭" />
//       <Greeting name="엣지" />

//       <Link to="/map">지도</Link>
//     </main>
//   );
// };

const IndexPage: React.FC<PageProps> = () => {
  return (
    <Layout pageTitle={"home"} tag={"대문"}>
      <p>레이아웃 함수 만들어 봄</p>
      <p>
        <Link to="../blog/test/">test</Link>
      </p>
      <p>
        <Link to="/page_test">test</Link>
      </p>
    </Layout>
  );
};

export const Head: HeadFC = () => <title>Home Page</title>;

export default IndexPage;
