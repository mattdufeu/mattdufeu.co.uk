import React from "react";
import { graphql, Link } from "gatsby";
import Layout from "../components/layout";
import PostFooter from "../components/PostFooter";
import Helmet from "react-helmet";

export default ({ data, pageContext }) => {
  const post = data.markdownRemark;
  const { previous, next } = pageContext;
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
          <Link to={previous.fields.slug} rel="prev">
            ← (Older) {previous.frontmatter.title}
          </Link>
        )}
        {next && (
          <Link to={next.fields.slug} rel="next">
            {next.frontmatter.title} (Newer) →
          </Link>
        )}
      </div>
    </Layout>
  );
};

export const query = graphql`
  query BlogPostBySlug($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      html
      frontmatter {
        title
        tags
        categories
        date(formatString: "MMMM DD, YYYY")
      }
    }
  }
`;
