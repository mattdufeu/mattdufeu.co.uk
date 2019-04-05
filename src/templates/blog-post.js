import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout";
import PostFooter from "../components/PostFooter";
import Helmet from "react-helmet";

export default ({ data }) => {
  const post = data.markdownRemark;
  return (
    <Layout>
      <article
        id="post-123"
        className="post-638 post type-post status-publish format-standard hentry category-net"
      >
        <Helmet>
          <meta charSet="utf-8" /> <title>{post.frontmatter.title}</title>
          <link rel="canonical" href="https://mattdufeu.co.uk" />
        </Helmet>
        <header className="entry-header">
          <h1 className="entry-title">{post.frontmatter.title}</h1>
        </header>
        <div
          className="entry-content"
          dangerouslySetInnerHTML={{ __html: post.html }}
        />
        <PostFooter doofer={data} />
      </article>
    </Layout>
  );
};

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      fields {
        slug
      }
      html
      frontmatter {
        title
        tags
        categories
      }
    }
  }
`;
