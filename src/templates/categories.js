import React from "react";

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
      <Link to="/blog/categories">All categories</Link>
    </Layout>
  );
};


export default Categories;

export const pageQuery = graphql`
  query($category: String) {
    allMdx(
      limit: 3
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { categories: { in: [$category] } } }
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
