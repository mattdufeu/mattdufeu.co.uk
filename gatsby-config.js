module.exports = {
  siteMetadata: {
    siteUrl: `https://mattdufeu.co.uk`,
    title: `Matt DuFeu - .NET and striving to learn`,
    description: `Hi, my name is Matt DuFeu. I share my experiences with all things .NET and various JavaScript front end frameworks.`,
    author: `Matt DuFeu`,
    keywords: [
      `.NET`,
      `.NET Core`,
      `c#`,
      `Azure`,
      `docker`,
      `javascript for c# devs`,
      `typescript`
    ]
  },
  plugins: [
    `gatsby-plugin-sitemap`,
    `gatsby-plugin-robots-txt`,
    {
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        trackingIds: ["UA-33703887-2"]
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: { name: `posts`, path: `${__dirname}/src/posts` }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: { name: `images`, path: `${__dirname}/src/images` }
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
        include_favicon: true // Include favicon
      }
    },
    "gatsby-plugin-offline",
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-emotion`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        defaultLayouts: {
          default: require.resolve("./src/components/layout.js")
        },
        extensions: [`.md`, `.mdx`],
        gatsbyRemarkPlugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              showCaptions: true,
              maxWidth: 590
            }
          },
          {
            resolve: "gatsby-remark-image-attributes",
            options: {
              styleAttributes: true
            }
          },
          `gatsby-remark-prismjs`
        ]
      }
    },
    `gatsby-transformer-sharp`,
    {
      resolve: "gatsby-plugin-mailchimp",
      options: {
        endpoint: process.env.MAILCHIMP_URL, // string; add your MC list endpoint here; see instructions below
        timeout: 3500 // number; the amount of time, in milliseconds, that you want to allow mailchimp to respond to your request before timing out. defaults to 3500
      }
    },
    `gatsby-plugin-twitter`
  ]
};
