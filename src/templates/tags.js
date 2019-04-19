import React from "react";
import PropTypes from "prop-types";

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
        {data.allMarkdownRemark.edges.map(({ node }) => {
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

Tags.propTypes = {
  pageContext: PropTypes.shape({
    tag: PropTypes.string.isRequired
  }),
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      totalCount: PropTypes.number.isRequired,
      edges: PropTypes.arrayOf(
        PropTypes.shape({
          node: PropTypes.shape({
            frontmatter: PropTypes.shape({
              title: PropTypes.string.isRequired
            }),
            fields: PropTypes.shape({
              slug: PropTypes.string.isRequired
            })
          })
        }).isRequired
      )
    })
  })
};

export default Tags;

export const pageQuery = graphql`
  query($tag: String) {
    allMarkdownRemark(
      limit: 3
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
      totalCount
      edges {
        node {
          id
          fields {
            slug
          }
          frontmatter {
            title
            date(formatString: "DD MMMM, YYYY")
            excerpt
            url
          }
          html
        }
      }
    }
  }
`;
