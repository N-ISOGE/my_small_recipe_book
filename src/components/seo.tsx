import React from "react";
import { graphql } from "gatsby";

export const query = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`

type SeoProps = {
  title: string;
};

const Seo = ({ title}: SeoProps) => {

  return (
    <title>
      {title} | {/*data.site.siteMetadata?.title /*|| "empty title"*/}
    </title>
  );
};

export default Seo;
