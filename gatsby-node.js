const path = require(`path`);
const _ = require("lodash");
const { createFilePath } = require(`gatsby-source-filesystem`);

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions;
  if (node.internal.type === `MarkdownRemark`) {
    const slug = createFilePath({ node, getNode, basePath: `pages` });
    createNodeField({ node, name: `slug`, value: slug });
  }
};

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;

  const tagTemplate = path.resolve("src/templates/tags.js");
  const categoryTemplate = path.resolve("src/templates/categories.js");

  return new Promise((resolve, reject) => {
    graphql(
      `
        {
          allMarkdownRemark {
            edges {
              node {
                fields {
                  slug
                }
                frontmatter {
                  tags
                  categories
                }
              }
            }
          }
        }
      `
    ).then(result => {
      const posts = result.data.allMarkdownRemark.edges;

      posts.forEach(({ node }) => {
        createPage({
          path: node.fields.slug,
          component: path.resolve(`./src/templates/blog-post.js`),
          context: {
            // Data passed to context is available
            // in page queries as GraphQL variables.
            slug: node.fields.slug
          }
        });
      });

      // Tag pages:
      let tags = [];
      // Iterate through each post, putting all found tags into `tags`
      _.each(posts, edge => {
        if (_.get(edge, "node.frontmatter.tags")) {
          tags = tags.concat(edge.node.frontmatter.tags);
        }
      });
      // Eliminate duplicate tags
      tags = _.uniq(tags);

      // Make tag pages
      tags.forEach(tag => {
        createPage({
          path: `/blog/tags/${_.kebabCase(tag)}/`,
          component: tagTemplate,
          context: {
            tag
          }
        });
      });

      // Category pages:
      let categories = [];
      // Iterate through each post, putting all found categories into `categories`
      _.each(posts, edge => {
        if (_.get(edge, "node.frontmatter.categories")) {
          categories = categories.concat(edge.node.frontmatter.categories);
        }
      });
      // Eliminate duplicate categories
      categories = _.uniq(categories);

      // Make category pages
      categories.forEach(category => {
        createPage({
          path: `/blog/categories/${_.kebabCase(category)}/`,
          component: categoryTemplate,
          context: {
            category
          }
        });
      });

      resolve();
    });
  });
};
