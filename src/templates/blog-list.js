import React from "react";
import { css } from "@emotion/core";
import { Link, graphql } from "gatsby";
import Helmet from "react-helmet";

// import { rhythm } from "../utils/typography";
import Layout from "../components/layout";

export default class BlogIndex extends React.Component {
  render() {
    const { data } = this.props;
    const { currentPage, numPages } = this.props.pageContext;
    const isFirst = currentPage === 1;
    const isLast = currentPage === numPages;
    const prevPage =
      currentPage - 1 === 1 ? "/" : "/blog/" + (currentPage - 1).toString();
    const nextPage = "/blog/" + (currentPage + 1).toString();

    return (
      <Layout>
        <Helmet>
          <body className="home blog logged-in admin-bar customize-support" />
        </Helmet>
        <div>
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
                <p className="byline">Posted on {node.frontmatter.date}</p>
              </article>
            );
          })}
        </div>
        <ul
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            alignItems: "center",
            listStyle: "none",
            padding: 0
          }}
        >
          {!isFirst && (
            <Link to={prevPage} rel="prev">
              ← Previous Page
            </Link>
          )}

          {!isLast && (
            <Link to={nextPage} rel="next">
              Next Page →
            </Link>
          )}
        </ul>
      </Layout>
    );
  }
}

export const query = graphql`
  query blogPageQuery($skip: Int!, $limit: Int!) {
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      limit: $limit
      skip: $skip
    ) {
      edges {
        node {
          html
          fields {
            slug
          }
          frontmatter {
            date(formatString: "DD MMMM, YYYY")
            title
            excerpt
            url
          }
        }
      }
    }
  }
`;
