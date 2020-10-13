import React from "react";

// Utilities
import kebabCase from "lodash/kebabCase";

// Components
import { Helmet } from "react-helmet";
import { Link, graphql } from "gatsby";

import Layout from "../../components/layout";

const CategoriesPage = ({
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
      Choose a category:
      <ul>
        {group.map((category) => (
          <li key={category.fieldValue}>
            <Link to={`/blog/categories/${kebabCase(category.fieldValue)}/`}>
              {category.fieldValue} ({category.totalCount})
            </Link>
          </li>
        ))}
      </ul>
    </div>
  </Layout>
);

export default CategoriesPage;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMdx(limit: 2000) {
      group(field: frontmatter___categories) {
        fieldValue
        totalCount
      }
    }
  }
`;
