import * as React from "react";
import { Link, HeadFC, PageProps } from "gatsby";
import Seo from "@components/seo";

const pageStyles: React.CSSProperties  = {
  color: "#232129",
  padding: "96px",
  fontFamily: "-apple-system, Roboto, sans-serif, serif",
};

const headingStyles: React.CSSProperties = {
  marginTop: 0,
  marginBottom: 64,
  maxWidth: 320,
};

const paragraphStyles: React.CSSProperties = {
  marginBottom: 48,
};

const codeStyles: React.CSSProperties = {
  color: "#8A6534",
  padding: 4,
  backgroundColor: "#FFF4DB",
  fontSize: "1.25rem",
  borderRadius: 4,
};

const NotFoundPage/*: React.FC<PageProps>?*/ = ({}:PageProps) => {
  return (
    <main style={pageStyles}>
      <h1 style={headingStyles}>Page not found</h1>
      <p style={paragraphStyles}>
        Sorry 😔, we couldn’t find what you were looking for.
        <br />
        {process.env.NODE_ENV === "development" ? (
          <>
            <br />
            Try creating a page in <code style={codeStyles}>src/pages/</code>.
            <br />
          </>
        ) : (
          <>
            <br />
            Sorry about that. 
          </>
        )}
        <br />
        <Link to="/">Go home</Link>.
      </p>
    </main>
  )
};

export const Head: HeadFC = () => <Seo title ="Not found"></Seo>;

export default NotFoundPage;