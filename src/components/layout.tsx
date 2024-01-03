import * as React from "react";
import { Link, useStaticQuery, graphql } from "gatsby";
import * as postStyles from "@components/post.module.css";

const Layout = ({ pageTitle, tag, children }: {
  pageTitle: string;
  tag: string;
  children: React.ReactNode;
}) => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);

  return (
    <div className={postStyles.container}>
      <header className={postStyles.siteTitle}>
        {data.site.siteMetadata.title}
      </header>
      <nav>
        <ul className={postStyles.navLinks}>
          <li className={postStyles.navLinkItem}>
            <Link to="/">home</Link>
          </li>
          <li className={postStyles.navLinkItem}>
            <Link to="/map">map</Link>
          </li>
          <li className={postStyles.navLinkItem}>
            <Link to="/blog">blog</Link>
          </li>          
          <li className={postStyles.navLinkItem}>
            <Link to="/empty">empty</Link>
          </li>
        </ul>
      </nav>
      <main>
        <h1 className={postStyles.postTitle}> {pageTitle} </h1>
        {tag}
        {children}
      </main>
    </div>
  );
};

export default Layout;
