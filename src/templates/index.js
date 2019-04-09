// import React from "react";
// import { css } from "@emotion/core";
// import { Link, graphql } from "gatsby";
// import Helmet from "react-helmet";

// // import { rhythm } from "../utils/typography";
// import Layout from "../components/layout";

// export default ({ data }) => {
//   debugger;
//   return (
//     <Layout>
//       <Helmet>
//         <body className="home blog logged-in admin-bar customize-support" />
//       </Helmet>
//       <div>
//         {data.allMarkdownRemark.edges.map(({ node }) => (
//           <article key={node.id}>
//             <Link
//               to={node.fields.slug}
//               css={css`
//                 text-decoration: none;
//                 color: inherit;
//               `}
//             >
//               <h1>{node.frontmatter.title}</h1>
//             </Link>
//             <div dangerouslySetInnerHTML={{ __html: node.html }} />
//           </article>
//         ))}
//       </div>
//     </Layout>
//   );
// };

// export const query = graphql`
//   query indexQuery($skip: Int!, $limit: Int!) {
//     allMarkdownRemark(
//       sort: { fields: [frontmatter___date], order: DESC }
//       filter: { fileAbsolutePath: { regex: "/blog/" } }
//       limit: $limit
//       skip: $skip
//     ) {
//       totalCount
//       edges {
//         node {
//           fileAbsolutePath
//           id
//           frontmatter {
//             title
//             date(formatString: "DD MMMM, YYYY")
//           }
//           fields {
//             slug
//           }
//           html
//         }
//       }
//     }
//   }
// `;
