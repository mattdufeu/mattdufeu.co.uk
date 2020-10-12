import React from "react";

// Components
import { Link, graphql } from "gatsby";

import { css } from "@emotion/core";
import Helmet from "react-helmet";

import Layout from "../components/layout";

const Tags = ({ pageContext, data }) => {
  const { tag } = pageContext;
  const tagHeader = `Posts tagged with "${tag}"`;

  return (
    <Layout>
      <Helmet>
        <body className="home blog logged-in admin-bar customize-support" />
      </Helmet>
      <div>
        {tagHeader}
        {data.allMdx.nodes.map(( node ) => {
          const content = node.frontmatter.excerpt
            ? node.frontmatter.excerpt
            : node.html;
          return (
            <article key={node.id}>
              <Link
                to={node.frontmatter.url}
                css={css`
                  text-decoration: none;
                  color: inherit;
                `}
              >
                <h1>{node.frontmatter.title}</h1>
              </Link>
              <div dangerouslySetInnerHTML={{ __html: content }} />
            </article>
          );
        })}
      </div>
      <Link to="/blog/tags">All tags</Link>
    </Layout>
  );
};

export default Tags;

export const pageQuery = graphql`
  query($tag: String) {
    allMdx(
      limit: 3
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
      nodes {
        frontmatter {
          title
          date(formatString: "DD MMMM, YYYY")
          excerpt
          url
        }
      }
    }
  }
`;
