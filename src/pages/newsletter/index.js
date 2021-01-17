import React from "react";

// Utilities
import { css } from "@emotion/core";

// Components
import { Link, graphql } from "gatsby";

import Layout from "../../components/layout";
import SEO from "../../components/SEO";
import MailChimp from "../../components/MailChimp";

const CategoriesPage = ({
  data: {
    allMdx: { edges },
    site: {
      siteMetadata: { title }
    }
  }
}) => (
  <Layout>
    <SEO
      title="Newsletter"
      pathname="/newsletter"
      description="I send out a monthly newsletter of links that I find useful or interesting. Topics range from .NET and JavaScript to Docker."
      keywords={[
        "Matt DuFeu newsletter",
        ".NET newsletter",
        "monthly newsletter"
      ]}
    />
    <article
      id="post-123"
      className="post-638 post type-post status-publish format-standard hentry category-net"
    >
      <header className="entry-header">
        <h1 className="entry-title">Monthly Newsletter</h1>
      </header>
      <p>
        Each month I publish a small newsletter of links, with commentary, of
        sites I've found useful or interesting. Generally they're about
        technical topics related to .NET or JavaScript
      </p>
      <p>
        If you would like to receive these one month before I post them here,
        please sign up below. I will <strong>never</strong> sell your data, you
        can unsubscribe at any time and it's free.
      </p>
      <MailChimp />
      <br />
      {/* <h3>Past Issues</h3>
      <ul>
        {edges.map((edge) => (
          <li key={edge.node.fields.slug}>
            <Link
              to={edge.node.frontmatter.url}
              css={css`
                text-decoration: none;
                color: "#007bff";
              `}
            >
              {edge.node.frontmatter.title}
            </Link>{" "}
            - {edge.node.frontmatter.description}
          </li>
        ))}
      </ul> */}
    </article>
  </Layout>
);

export default CategoriesPage;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMdx(
      sort: { fields: [frontmatter___date], order: DESC }
      limit: 1000
      filter: { fields: { slug: { regex: "/newsletter/" } } }
    ) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
            url
            description
          }
        }
      }
    }
  }
`;
