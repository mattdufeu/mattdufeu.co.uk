import React, { Component } from "react";
import { Link } from "gatsby";
import kebabCase from "lodash/kebabCase";

class PostFooter extends Component {
  renderTags() {
    let tags = this.props.doofer.markdownRemark.frontmatter.tags;

    if (tags) {
      let allTags = tags.map(x => (
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
    let categories = this.props.doofer.markdownRemark.frontmatter.categories;

    if (categories) {
      let allCategories = categories.map(x => (
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
        Posted on
        <a
          href={this.props.doofer.markdownRemark.fields.slug}
          title="1:29 pm"
          rel="bookmark"
        >
          <time className="entry-date" dateTime="2014-09-15T13:29:02+00:00">
            15 September, 2014{" "}
          </time>
        </a>
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
