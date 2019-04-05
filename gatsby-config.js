module.exports = {
  siteMetadata: {
    siteUrl: `https://mattdufeu.co.uk`,
    title: `Matt DuFeu - Father and .NET enthusiast. Constantly striving to learn`
  },
  plugins: [
    `gatsby-plugin-sitemap`,
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: "UA-33703887-2"
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: { name: `src`, path: `${__dirname}/src/` }
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: "GatsbyJS",
        short_name: "GatsbyJS",
        start_url: "/",
        background_color: "#6b37bf",
        theme_color: "#6b37bf",
        display: "standalone",
        icon: `src/images/favicon.ico`, // This path is relative to the root of the site.
        include_favicon: true // Include favicon
      }
    },
    "gatsby-plugin-offline",
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-emotion`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              showCaptions: true,
              maxWidth: 590
            }
          },
          `gatsby-remark-prismjs`
        ]
      }
    },
    "gatsby-redirect-from",
    "gatsby-plugin-meta-redirect"
  ]
};
