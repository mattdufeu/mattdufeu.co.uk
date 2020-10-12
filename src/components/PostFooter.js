import React, { Component } from "react";
import { Link } from "gatsby";
import kebabCase from "lodash/kebabCase";

class PostFooter extends Component {
  renderTags() {
    let tags = this.props.data.mdx.frontmatter.tags;

    if (tags) {
      let allTags = tags.map((x) => (
        <Link key={x} to={`/blog/tags/${kebabCase(x)}`}>
          {x}
        </Link>
      ));

      return (
        <>
          <span className="sep"> | </span>Tagged {allTags}
        </>
      );
    } else {
      return "";
    }
  }

  renderCategories() {
    let categories = this.props.data.mdx.frontmatter.categories;

    if (categories) {
      let allCategories = categories.map((x) => (
        <Link key={x} to={`/blog/categories/${kebabCase(x)}`}>
          {x}
        </Link>
      ));

      return <>in {allCategories}</>;
    } else {
      return "";
    }
  }

  render() {
    return (
      <footer className="entry-meta">
        Posted on{" "}
        <time className="entry-date" dateTime="2014-09-15T13:29:02+00:00">
          {this.props.data.mdx.frontmatter.date}
        </time>{" "}
        <span className="byline">
          by <span className="author vcard">DuFeu</span>{" "}
        </span>
        <span className="cat-links">{this.renderCategories()}</span>
        <span className="tags-links">{this.renderTags()}</span>
      </footer>
    );
  }
}

export default PostFooter;
