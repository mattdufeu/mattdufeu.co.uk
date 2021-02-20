import React from "react";
import { graphql, Link } from "gatsby";
import Layout from "../components/layout";
import PostFooter from "../components/PostFooter";
import { MDXRenderer } from "gatsby-plugin-mdx";
import SEO from "../components/SEO";
import MailChimp from "../components/MailChimp";

export default ({ data, pageContext }) => {
  const post = data.mdx;
  const { previous, next } = pageContext;
  const description = post.frontmatter.description
    ? post.frontmatter.description.substring(0, 320)
    : null;
  const image = post.frontmatter.image
    ? post.frontmatter.image.childImageSharp.resize
    : null;

  return (
    <Layout>
      <SEO
        title={post.frontmatter.title}
        pathname={post.frontmatter.url}
        description={description}
        keywords={post.frontmatter.keywords}
        image={image}
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
          padding: 0,
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
      <MailChimp />
      <div className="comments-section">
        <hr />
        <h3>Comments Section</h3>
        {data.allCommentsYaml &&
          data.allCommentsYaml.edges.map((comment, index) => {
            return (
              <div className="col-md-12" key={"comment-" + index}>
                <div className="row">
                  <div className="col-md-12 mb-6">
                    <strong>{comment.node.name}</strong>{" "}
                    <i>
                      (
                      <span className="dbc-comment-date">
                        {new Date(comment.node.date * 1000).toLocaleString()}
                      </span>
                      )
                    </i>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12 mb-6 font-weight-light">
                    <div className="dbc-comment-content">
                      {comment.node.message}
                    </div>
                  </div>
                </div>
                <hr />
              </div>
            );
          })}
        <form
          method="POST"
          action="https://mattdufeustaticmaninstance.herokuapp.com/v3/entry/github/mattdufeu/mattdufeu.co.uk/master/comments"
        >
          <input
            name="options[redirect]"
            type="hidden"
            value={"https://mattdufeu.co.uk" + post.frontmatter.url}
          />
          <input
            name="fields[slug]"
            type="hidden"
            value={"/" + post.slug + "/"}
          />
          <div className="form-group">
            <div className="row">
              <div className="col-md-6 mb-3">
                <label htmlFor="fields[name]" className="control-label">
                  Name
                </label>
                <input
                  id="fields[name]"
                  name="fields[name]"
                  type="text"
                  className="form-control"
                  required
                />
              </div>
            </div>

            <div className="row">
              <div className="col-md-12 mb-3">
                <label htmlFor="Message" className="control-label">
                  Message
                </label>
                <textarea
                  id="Message"
                  rows="12"
                  cols="40"
                  className="form-control"
                  name="fields[message]"
                  required
                ></textarea>
              </div>
            </div>

            <button type="submit" className="btn btn-primary btn-block">
              Save Comment
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export const query = graphql`
  query BlogPostBySlug($slug: String!) {
    allCommentsYaml(
      sort: { fields: [date], order: DESC }
      filter: { slug: { eq: $slug } }
    ) {
      edges {
        node {
          message
          name
          date
        }
      }
    }
    mdx(fields: { slug: { eq: $slug } }) {
      id
      body
      slug
      frontmatter {
        title
        tags
        categories
        date(formatString: "MMMM DD, YYYY")
        url
        description
        keywords
        image: featuredImage {
          childImageSharp {
            resize(width: 800) {
              src
              height
              width
            }
          }
        }
      }
    }
  }
`;
