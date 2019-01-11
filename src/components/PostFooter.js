import React, { Component } from "react";

class PostFooter extends Component {
  render() {
    console.log();
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
        <span className="cat-links">in Agile</span>
        <span className="sep"> | </span>
        <span className="tags-links">Tagged Retrospective</span>
      </footer>
    );
  }
}

export default PostFooter;
