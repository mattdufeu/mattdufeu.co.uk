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
        <aside id="recent-posts-4" className="widget_recent_entries">
          <h1 className="widget-title">Recent Posts</h1>
          <ul>
            <li>
              <a href="http://localhost:8080/roslyn-codefix-to-add-a-tostring-method/">
                How To Use Roslyn CodeFix to add a ToString method
              </a>
              <span className="post-date">19 April, 2017</span>
            </li>
            <li>
              <a href="http://localhost:8080/command-pattern-web-api2-mediatr-ninject/">
                Command Pattern in Web API2 with MediatR and Ninject
              </a>
              <span className="post-date">7 March, 2017</span>
            </li>
            <li>
              <a href="http://localhost:8080/setup-intellisense-vscode-react-js/">
                How To Setup Intellisense in VSCode for React.js
              </a>
              <span className="post-date">24 May, 2016</span>
            </li>
            <li>
              <a href="http://localhost:8080/scrum-master-tip-team-consensus/">
                Scrum Master Tip – Team Consensus
              </a>
              <span className="post-date">20 March, 2016</span>
            </li>
            <li>
              <a href="http://localhost:8080/unit-testing-check-your-return-on-investment/">
                Unit Testing – Check your Return on Investment
              </a>
              <span className="post-date">29 February, 2016</span>
            </li>
          </ul>
        </aside>
        <aside id="search-3" className="widget_search">
          <form
            method="get"
            className="search-form"
            action="http://localhost:8080/"
          >
            <label htmlFor="s" className="assistive-text">
              Search
            </label>
            <input
              type="text"
              id="s"
              className="field"
              name="s"
              placeholder="Search"
            />
            <input
              type="submit"
              className="submit"
              name="submit"
              value="Search"
            />
          </form>
        </aside>
        <aside id="categories-4" className="widget_categories">
          <h1 className="widget-title">Categories</h1>
          <ul>
            <li className="cat-item cat-item-30">
              <a href="http://localhost:8080/category/net/">.NET</a> (6)
            </li>
            <li className="cat-item cat-item-22">
              <a href="http://localhost:8080/category/agile/">Agile</a>
              (26)
            </li>
            <li className="cat-item cat-item-13">
              <a href="http://localhost:8080/category/azure/">Azure</a>
              (1)
            </li>
            <li className="cat-item cat-item-25">
              <a href="http://localhost:8080/category/javascript/">
                JavaScript
              </a>
              (2)
            </li>
            <li className="cat-item cat-item-36">
              <a href="http://localhost:8080/category/react/">React</a>
              (1)
            </li>
          </ul>
        </aside>
        <aside id="archives-4" className="widget_archive">
          <h1 className="widget-title">Archives</h1>
          <label className="screen-reader-text" htmlFor="archives-dropdown-4">
            Archives
          </label>
          <select id="archives-dropdown-4" name="archive-dropdown">
            <option value="">Select Month</option>
            <option value="http://localhost:8080/2017/04/">
              April 2017 &nbsp;(1)
            </option>
            <option value="http://localhost:8080/2017/03/">
              March 2017 &nbsp;(1)
            </option>
            <option value="http://localhost:8080/2016/05/">
              May 2016 &nbsp;(1)
            </option>
            <option value="http://localhost:8080/2016/03/">
              March 2016 &nbsp;(1)
            </option>
            <option value="http://localhost:8080/2016/02/">
              February 2016 &nbsp;(3)
            </option>
            <option value="http://localhost:8080/2016/01/">
              January 2016 &nbsp;(4)
            </option>
            <option value="http://localhost:8080/2015/10/">
              October 2015 &nbsp;(1)
            </option>
            <option value="http://localhost:8080/2015/05/">
              May 2015 &nbsp;(3)
            </option>
            <option value="http://localhost:8080/2015/04/">
              April 2015 &nbsp;(3)
            </option>
            <option value="http://localhost:8080/2015/03/">
              March 2015 &nbsp;(3)
            </option>
            <option value="http://localhost:8080/2015/01/">
              January 2015 &nbsp;(3)
            </option>
            <option value="http://localhost:8080/2014/11/">
              November 2014 &nbsp;(1)
            </option>
            <option value="http://localhost:8080/2014/10/">
              October 2014 &nbsp;(2)
            </option>
            <option value="http://localhost:8080/2014/09/">
              September 2014 &nbsp;(2)
            </option>
            <option value="http://localhost:8080/2014/08/">
              August 2014 &nbsp;(3)
            </option>
            <option value="http://localhost:8080/2014/07/">
              July 2014 &nbsp;(1)
            </option>
            <option value="http://localhost:8080/2014/01/">
              January 2014 &nbsp;(1)
            </option>
            <option value="http://localhost:8080/2012/09/">
              September 2012 &nbsp;(1)
            </option>
            <option value="http://localhost:8080/2012/07/">
              July 2012 &nbsp;(1)
            </option>
          </select>
        </aside>
      </div>
    );
  }
}

export default LayoutSidebar;
