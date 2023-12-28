import React from "react";
import { useStaticQuery, graphql } from "gatsby";

const data = useStaticQuery(graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`);

type SeoProps = {
  title: string;
};

const Seo = ({ title }: SeoProps) => {
  return (
    <title>
      {title} | {data.site.siteMetadata.title}
    </title>
  );
};

export default Seo;
