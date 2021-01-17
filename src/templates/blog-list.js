import React from "react";
import { css } from "@emotion/core";
import { Link, graphql } from "gatsby";

// import { rhythm } from "../utils/typography";
import Layout from "../components/layout";
import SEO from "../components/SEO";
import MailChimp from "../components/MailChimp";
import Img from "gatsby-image";

export default class BlogIndex extends React.Component {
  render() {
    const { data } = this.props;
    const { currentPage, numPages } = this.props.pageContext;
    const isFirst = currentPage === 1;
    const isLast = currentPage === numPages;
    const prevPage =
      currentPage - 1 === 1 ? "/" : "/blog/" + (currentPage - 1).toString();
    const nextPage = "/blog/" + (currentPage + 1).toString();
    const pathname = currentPage - 1 === 0 ? "/" : "/blog/" + currentPage;

    return (
      <Layout>
        <SEO pathname={pathname} />
        <div style={{ marginBottom: "1rem" }}>
          {data.allMdx.nodes.map((node) => {
            const content = node.frontmatter.excerpt
              ? node.frontmatter.excerpt
              : node.html;
            const featuredImage =
              node.frontmatter.image &&
              node.frontmatter.image.childImageSharp &&
              node.frontmatter.image.childImageSharp.fluid
                ? node.frontmatter.image.childImageSharp.fluid
                : null;
            return (
              <article key={node.id} style={{ borderBottom: "1px solid #ddd" }}>
                <Link
                  to={node.frontmatter.url}
                  css={css`
                    text-decoration: none;
                    color: inherit;
                  `}
                >
                  <h2>{node.frontmatter.title}</h2>
                </Link>
                <div
                  style={{
                    margin: "auto",
                    width: "400px",
                    marginTop: "10px",
                    marginBottom: "10px"
                  }}
                >
                  <Img fluid={featuredImage} />
                </div>
                <div dangerouslySetInnerHTML={{ __html: content }} />
                <p className="byline">Posted on {node.frontmatter.date}</p>
              </article>
            );
          })}
        </div>
        <div style={{ paddingBottom: "1rem", borderBottom: "1px solid #ddd" }}>
          <MailChimp />
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
    allMdx(
      sort: { fields: [frontmatter___date], order: DESC }
      limit: $limit
      skip: $skip
      filter: { fields: { slug: { regex: "/blog/" } } }
    ) {
      nodes {
        id
        body
        fields {
          slug
        }
        frontmatter {
          date(formatString: "DD MMMM, YYYY")
          title
          excerpt
          url
          image: featuredImage {
            childImageSharp {
              fluid(maxWidth: 630) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
    }
  }
`;
