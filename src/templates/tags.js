import React from "react";

// Components
import { Link, graphql } from "gatsby";

import { css } from "@emotion/core";

import Layout from "../components/layout";
import SEO from "../components/SEO";

const Tags = ({ pageContext, data }) => {
  const { tag } = pageContext;
  const tagHeader = `Posts tagged with "${tag}"`;
  const pathname = `/blog/tags/${tag.toLowerCase()}`;

  return (
    <Layout>
      <SEO title={tagHeader} pathname={pathname} keywords={[]} />
      <div>
        {tagHeader}
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
      <Link to="/blog/tags">All tags</Link>
    </Layout>
  );
};

export default Tags;

export const pageQuery = graphql`
  query($tag: String) {
    allMdx(
      limit: 4
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
