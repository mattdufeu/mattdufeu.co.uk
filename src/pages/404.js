import React from "react";

import Layout from "../components/layout";
import SEO from "../components/SEO";

const TagsPage = () => (
  <Layout>
    <SEO title="Page Not Found - 404" pathname="404" keywords={[]} />
    <article>
      <header class="entry-header">
        <h2 class="entry-title">Page Not Found - 404</h2>
      </header>
      <p>
        Oops, that's a <strong>404</strong> - we couldn't find the page you
        requested
      </p>
      <p>
        The page you were looking for has either been moved, deleted, or doesn't
        exist. Click <a href="/">here </a> or the button below to go back home.
      </p>
    </article>
  </Layout>
);

export default TagsPage;
