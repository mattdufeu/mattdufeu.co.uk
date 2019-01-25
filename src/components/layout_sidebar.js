import React, { Component } from "react";

class LayoutSidebar extends Component {
  render() {
    return (
      <div id="sidebar" role="complementary">
        <aside id="pages-3" className="widget_pages">
          <h1 className="widget-title"> </h1>
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
                height: "20px"
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
      </div>
    );
  }
}

export default LayoutSidebar;
