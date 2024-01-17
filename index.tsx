import * as React from "react";
import type { HeadFC, PageProps } from "gatsby";
import { Link } from "gatsby";
import { StaticImage } from "gatsby-plugin-image";
import Layout from "@components/layout";
import Seo from "@components/seo";

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

// React.FC<PageProps>?
const IndexPage = () => {
  return (
    <Layout pageTitle={"home"} tag={"대문"}>
      <p>레이아웃 함수 만들어 봄</p>

      <StaticImage
        alt="avatar"
        src="https://avatars.githubusercontent.com/u/7279031?v=4"
        layout="fixed"
        width={400}
        height={400}
      />
    </Layout>
  );
};

export const Head: HeadFC = () => <Seo title="Home Page"></Seo>;

export default IndexPage;
