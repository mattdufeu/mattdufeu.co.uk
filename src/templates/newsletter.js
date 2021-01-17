import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout";
import PostFooter from "../components/PostFooter";
import { MDXRenderer } from "gatsby-plugin-mdx";
import SEO from "../components/SEO";

export default ({ data, pageContext }) => {
  const post = data.mdx;

  const keywords = [".NET", "JavaScript", "newsletter"];

  return (
    <Layout>
      <SEO
        title={post.frontmatter.title}
        pathname={post.frontmatter.url}
        description={
          post.frontmatter.title + " - " + post.frontmatter.description
        }
        keywords={keywords}
      />
      <article
        id="post-123"
        className="post-638 post type-post status-publish format-standard hentry category-net"
      >
        <header className="entry-header">
          <h1 className="entry-title">{post.frontmatter.title}</h1>
        </header>
        <div className="entry-content">
          <MDXRenderer>{post.body}</MDXRenderer>
        </div>
        <PostFooter data={data} />
      </article>
    </Layout>
  );
};

export const query = graphql`
  query($slug: String!) {
    mdx(fields: { slug: { eq: $slug } }) {
      body
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        url
        description
      }
    }
  }
`;
