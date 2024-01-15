import * as React from "react";
import { graphql, useStaticQuery } from "gatsby";
import Layout from "@components/layout";
import Seo from "@components/seo";

const BlogPage = () => {
  const data = useStaticQuery(graphql`
    query {
      allFile(filter: { sourceInstanceName: { eq: "blog" } }) {
        nodes {
          name
        }
      }
    }
  `);

  return (
    <Layout pageTitle={"글 목록"} tag={"blog"}>
      <p>list</p>
      <ul>
        {data.allFile.nodes.map((node: { name: string }) => (
          <li key={node.name}>{node.name}</li>
        ))}
      </ul>
    </Layout>
  );
};

export const Head = () => <Seo title="Blog posts"></Seo>;

export default BlogPage;
