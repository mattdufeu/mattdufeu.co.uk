import React from "react";

// Components
import { Link, graphql } from "gatsby";

import { css } from "@emotion/core";

import Layout from "../components/layout";
import SEO from "../components/SEO";

const Categories = ({ pageContext, data }) => {
  const { category } = pageContext;
  const categoryHeader = `Posts with a category of "${category}"`;
  const pathname = `/blog/categories/${category.toLowerCase()}`;

  return (
    <Layout>
      <SEO title={categoryHeader} pathname={pathname} keywords={[]} />
      <div>
        {categoryHeader}
        {data.allMdx.nodes.map((node) => {
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
                <h2>{node.frontmatter.title}</h2>
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
      limit: 4
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
