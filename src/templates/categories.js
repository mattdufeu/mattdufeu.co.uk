import React from "react";
import PropTypes from "prop-types";

// Components
import { Link, graphql } from "gatsby";

import { css } from "@emotion/core";
import Helmet from "react-helmet";

import Layout from "../components/layout";

const Categories = ({ pageContext, data }) => {
  const { category } = pageContext;
  const categoryHeader = `Posts tagged with "${category}"`;

  return (
    <Layout>
      <Helmet>
        <body className="home blog logged-in admin-bar customize-support" />
      </Helmet>
      <div>
        {categoryHeader}
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
      <Link to="/blog/categories">All categories</Link>
    </Layout>
  );
};

Categories.propTypes = {
  pageContext: PropTypes.shape({
    category: PropTypes.string.isRequired
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

export default Categories;

export const pageQuery = graphql`
  query($category: String) {
    allMarkdownRemark(
      limit: 3
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { categories: { in: [$category] } } }
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
