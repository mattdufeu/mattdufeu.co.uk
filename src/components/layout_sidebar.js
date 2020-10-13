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
              <a href="/about/">About</a>
            </li>
          </ul>
        </aside>
        <aside id="text-6" className="widget_text">
          <div className="textwidget">
            <iframe
              id="twitter-widget-0"
              scrolling="no"
              allowtransparency="true"
              className="twitter-follow-button twitter-follow-button-rendered"
              style={{
                position: "static",
                visibility: "visible",
                width: "126px",
                height: "20px",
              }}
              title="Twitter Follow Button"
              src="https://platform.twitter.com/widgets/follow_button.d30011b0f5ce05b98f24b01d3331b3c1.en-gb.html#dnt=false&amp;id=twitter-widget-0&amp;lang=en-gb&amp;screen_name=mattdufeu&amp;show_count=false&amp;show_screen_name=true&amp;size=m&amp;time=1545324279142"
              data-screen-name="mattdufeu"
              frameBorder="0"
            />
            <script
              async=""
              src="//platform.twitter.com/widgets.js"
              charSet="utf-8"
            />
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
