const path = require(`path`);
const _ = require("lodash");
const { createFilePath } = require(`gatsby-source-filesystem`);

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions;
  if (node.internal.type === `Mdx`) {
    const slug = createFilePath({ node, getNode });
    createNodeField({ node, name: `slug`, value: slug });
  }
};

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;

  return new Promise((resolve, reject) => {
    graphql(
      `
        {
          allMdx(
            sort: { fields: [frontmatter___date], order: DESC }
            limit: 1000
          ) {
            edges {
              node {
                fields {
                  slug
                }
                frontmatter {
                  title
                  tags
                  categories
                  excerpt
                  url
                }
              }
            }
          }
        }
      `
    ).then((result) => {
      const posts = result.data.allMdx.edges;

      posts.forEach((post, index) => {
        const previous =
          index === posts.length - 1 ? null : posts[index + 1].node;
        const next = index === 0 ? null : posts[index - 1].node;

        createPage({
          path: post.node.frontmatter.url,
          component: path.resolve(`./src/templates/blog-post.js`),
          context: {
            slug: post.node.fields.slug,
            previous,
            next,
          },
        });
      });

      // Tag pages:
      let tags = [];
      // Iterate through each post, putting all found tags into `tags`
      _.each(posts, (edge) => {
        if (_.get(edge, "node.frontmatter.tags")) {
          tags = tags.concat(edge.node.frontmatter.tags);
        }
      });
      // Eliminate duplicate tags
      tags = _.uniq(tags);

      // Make tag pages
      tags.forEach((tag) => {
        createPage({
          path: `/blog/tags/${_.kebabCase(tag)}/`,
          component: path.resolve("src/templates/tags.js"),
          context: {
            tag,
          },
        });
      });

      // Category pages:
      let categories = [];
      // Iterate through each post, putting all found categories into `categories`
      _.each(posts, (edge) => {
        if (_.get(edge, "node.frontmatter.categories")) {
          categories = categories.concat(edge.node.frontmatter.categories);
        }
      });
      // Eliminate duplicate categories
      categories = _.uniq(categories);

      // Make category pages
      categories.forEach((category) => {
        createPage({
          path: `/blog/categories/${_.kebabCase(category)}/`,
          component: path.resolve("src/templates/categories.js"),
          context: {
            category,
          },
        });
      });

      const postsPerPage = 3;
      const numPages = Math.ceil(posts.length / postsPerPage);
      Array.from({ length: numPages }).forEach((_, i) => {
        createPage({
          path: i === 0 ? `/` : `/blog/${i + 1}`,
          component: path.resolve("./src/templates/blog-list.js"),
          context: {
            limit: postsPerPage,
            skip: i * postsPerPage,
            numPages,
            currentPage: i + 1,
          },
        });
      });

      resolve();
    });
  });
};
