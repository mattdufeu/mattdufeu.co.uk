module.exports = {
  siteMetadata: { title: `Pandas Eating Lots` },
  plugins: [
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
        display: "standalone"
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
          }
        ]
      }
    }
  ]
};
