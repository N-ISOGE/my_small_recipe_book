import * as React from "react";
import { Link } from "gatsby";
import * as postStyles from './post.module.css';

const Layout = ({
  pageTitle,
  tag,
  children,
}: {
  pageTitle: string;
  tag: string;
  children: React.ReactNode;
}) => {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/">home</Link>
          </li>
          <li>
            <Link to="/map">map</Link>
          </li>
          <li>
            <Link to="../blog">blog</Link>
          </li>
        </ul>
      </nav>
      <main>
        <h1 className={postStyles.title}> {pageTitle} </h1>
        {tag}
        {children}
      </main>
    </div>
  );
};

export default Layout;
