module.exports = {
  siteMetadata: {
    siteUrl: `https://mattdufeu.co.uk`,
    title: `Matt DuFeu - Father and .NET enthusiast. Striving to learn`,
  },
  plugins: [
    `gatsby-plugin-sitemap`,
    {
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        trackingIds: ["UA-33703887-2"],
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: { name: `posts`, path: `${__dirname}/src/posts` },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: { name: `images`, path: `${__dirname}/src/images` },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: "Matt DuFeu",
        short_name: "MattDuFeu",
        start_url: "/",
        background_color: "#6b37bf",
        theme_color: "#6b37bf",
        display: "standalone",
        icon: `src/images/favicon.ico`, // This path is relative to the root of the site.
        include_favicon: true, // Include favicon
      },
    },
    "gatsby-plugin-offline",
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-emotion`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        defaultLayouts: {
          default: require.resolve("./src/components/layout.js"),
        },
        extensions: [`.md`, `.mdx`],
        gatsbyRemarkPlugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              showCaptions: true,
              maxWidth: 590,
            },
          },
          `gatsby-remark-prismjs`,
          "gatsby-redirect-from",
        ],
      },
    },
    "gatsby-plugin-meta-redirect",
  ],
};
