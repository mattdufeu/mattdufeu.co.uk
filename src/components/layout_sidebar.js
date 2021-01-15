import React from "react";

import { graphql, Link, StaticQuery } from "gatsby";
import kebabCase from "lodash/kebabCase";

const LayoutSidebar = () => (
  <StaticQuery
    query={graphql`
      query {
        site {
          siteMetadata {
            title
          }
        }
        tagsGroup: allMdx(limit: 2000) {
          group(field: frontmatter___tags) {
            fieldValue
            totalCount
          }
        }
        categoriesGroup: allMdx(limit: 2000) {
          group(field: frontmatter___categories) {
            fieldValue
            totalCount
          }
        }
      }
    `}
    render={(data) => (
      <div id="sidebar" role="complementary">
        <aside id="pages-3" className="widget_pages">
          <ul>
            <li className="page_item page-item-26">
              <a href="/">Home</a>
            </li>
            <li className="page_item page-item-26">
              <a href="/about/">About</a>
            </li>
            <li className="page_item page-item-26">
              <a href="/newsletter/">Newsletter</a>
            </li>
            <li className="page_item page-item-26">
              <a href="/blog/tags/">Tags</a>
            </li>
            <li className="page_item page-item-26">
              <a href="/blog/categories/">Categories</a>
            </li>
          </ul>
        </aside>
        <aside id="text-6" className="widget_text">
          <div className="textwidget">
            <a
              href="https://twitter.com/mattdufeu?ref_src=twsrc%5Etfw"
              className="twitter-follow-button"
              data-show-count="false"
            >
              Follow @mattdufeu
            </a>
            <script
              async
              src="https://platform.twitter.com/widgets.js"
              charSet="utf-8"
            ></script>
          </div>
        </aside>
        <h2 className="widget-title">Choose a tag:</h2>
        <div>
          <ul>
            {data.tagsGroup.group.map((tag) => (
              <li key={tag.fieldValue}>
                <Link to={`/blog/tags/${kebabCase(tag.fieldValue)}/`}>
                  {tag.fieldValue} ({tag.totalCount})
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="widget-title">Choose a category:</h2>
          <ul>
            {data.categoriesGroup.group.map((tag) => (
              <li key={tag.fieldValue}>
                <Link to={`/blog/categories/${kebabCase(tag.fieldValue)}/`}>
                  {tag.fieldValue} ({tag.totalCount})
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    )}
  />
);

export default LayoutSidebar;
