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
    ? post.frontmatter.description.substring(0, 320)
    : null;

  return (
    <Layout>
      <SEO
        title={post.frontmatter.title}
        pathname={post.frontmatter.url}
        description={description}
        keywords={post.frontmatter.keywords}
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
      <div
        style={{
          display: `flex`,
          flexWrap: `wrap`,
          justifyContent: `space-between`,
          padding: 0
        }}
      >
        {previous && (
          <Link to={previous.frontmatter.url} rel="prev">
            ← (Older) {previous.frontmatter.title}
          </Link>
        )}
        {next && (
          <Link to={next.frontmatter.url} rel="next">
            {next.frontmatter.title} (Newer) →
          </Link>
        )}
      </div>
    </Layout>
  );
};

export const query = graphql`
  query BlogPostBySlug($slug: String!) {
    mdx(fields: { slug: { eq: $slug } }) {
      id
      body
      frontmatter {
        title
        tags
        categories
        date(formatString: "MMMM DD, YYYY")
        url
        description
        keywords
      }
    }
  }
`;
