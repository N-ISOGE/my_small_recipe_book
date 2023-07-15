import * as React from "react";
import { Link } from "gatsby";

const Layout = ({
  pageTitle,
  children,
}: {
  pageTitle: string;
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
            <Link to="/map">map</Link>{" "}
          </li>
        </ul>
      </nav>
      <main>
        <h1>{pageTitle} </h1>
        {children}
      </main>
    </div>
  );
};

export default Layout;
