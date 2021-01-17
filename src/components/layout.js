import React from "react";
import { Link, StaticQuery, graphql } from "gatsby";

import SEO from "./SEO";
import "../styles.css";

import LayoutSideBar from "./layout_sidebar";

require("prismjs/plugins/line-numbers/prism-line-numbers.css");

export default ({ children }) => (
  <StaticQuery
    query={graphql`
      query {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
    render={(data) => {
      return (
        <>
          <SEO pathname="test" />
          <header id="site-header" role="banner">
            <div className="hgroup">
              <div className="main-header">
                <Link to="/">
                  Matt <span>DuFeu</span>
                </Link>
              </div>
              <div className="tag-line">.NET and striving to learn</div>
            </div>
          </header>
          <div id="main" className="site-main">
            <div id="content-area">
              <div id="site-content" role="main">
                {children}
              </div>
              <LayoutSideBar />
            </div>
          </div>
          <footer id="site-footer" role="contentinfo">
            <div id="site-info">
              Copyright © Matt DuFeu 2021. Copy of the WordPress theme by{" "}
              <a href="https://geek.hellyer.kiwi/" title="Ryan Hellyer">
                Ryan Hellyer
              </a>
              .{" "}
            </div>
          </footer>
        </>
      );
    }}
  />
);
