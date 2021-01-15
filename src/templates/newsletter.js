import React from "react";
import { graphql, Link } from "gatsby";
import Layout from "../components/layout";
import PostFooter from "../components/PostFooter";
import { MDXRenderer } from "gatsby-plugin-mdx";
import SEO from "../components/SEO";

export default ({ data, pageContext }) => {
  const post = data.mdx;
  const { previous, next } = pageContext;
  const description = post.frontmatter.description
    ? post.frontmatter.description.substring(0, 156)
    : null;

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
          <h2 className="entry-title">{post.frontmatter.title}</h2>
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
