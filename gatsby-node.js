/* eslint-disable */

/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const path = require('path');

exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions;

  const ruleTemplate = path.resolve(`src/templates/ruleTemplate.tsx`);

  return graphql(`{
  allMarkdownRemark(sort: {frontmatter: {path: DESC}}, limit: 1000) {
    edges {
      node {
        frontmatter {
          path
        }
      }
    }
  }
}`).then((result) => {
    if (result.errors) {
      return Promise.reject(result.errors);
    }

    return result.data.allMarkdownRemark.edges.forEach(({ node }) => {
      if (node.frontmatter.path) {
        createPage({
          path: node.frontmatter.path,
          component: ruleTemplate,
          context: {}, // additional data can be passed via context
        });
      }
    });
  });
};
