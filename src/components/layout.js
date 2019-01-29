import React from "react";
// import { css } from "@emotion/core";
import { Link, StaticQuery, graphql } from "gatsby";
import Helmet from "react-helmet";

// import { rhythm } from "../utils/typography";
import LayoutSideBar from "./layout_sidebar";
import "../styles.css";
import icon from "../images/favicon.ico";

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
    render={data => (
      <>
        <header id="site-header" role="banner">
          <div className="hgroup">
            <h1>
              <Link to="/">
                Matt<span>DuFeu</span>
              </Link>
            </h1>
            <h2>Father and .NET enthusiast. Constantly striving to learn</h2>
          </div>
        </header>
        <Helmet>
          <meta charSet="utf-8" /> <title>{data.site.siteMetadata.title}</title>
          <link rel="canonical" href="https://mattdufeu.co.uk" />
          <link rel="icon" type="image/png" href={icon} sizes="16x16" />
        </Helmet>
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
            Copyright © Matt DuFeu 2019. Copy of the WordPress theme by{" "}
            <a href="https://geek.hellyer.kiwi/" title="Ryan Hellyer">
              Ryan Hellyer
            </a>
            .{" "}
          </div>
        </footer>
      </>
    )}
  />
);
