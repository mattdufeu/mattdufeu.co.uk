import React from "react";

// Utilities
import kebabCase from "lodash/kebabCase";

// Components
import { Helmet } from "react-helmet";
import { Link, graphql } from "gatsby";

import Layout from "../../components/layout";

const TagsPage = ({
  data: {
    allMdx: { group },
    site: {
      siteMetadata: { title },
    },
  },
}) => (
  <Layout>
    <Helmet>
      <body className="home blog logged-in admin-bar customize-support" />
    </Helmet>
    <div>
      Choose a tag:
      <ul>
        {group.map((tag) => (
          <li key={tag.fieldValue}>
            <Link to={`/blog/tags/${kebabCase(tag.fieldValue)}/`}>
              {tag.fieldValue} ({tag.totalCount})
            </Link>
          </li>
        ))}
      </ul>
    </div>
  </Layout>
);

export default TagsPage;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMdx(limit: 2000) {
      group(field: frontmatter___tags) {
        fieldValue
        totalCount
      }
    }
  }
`;
