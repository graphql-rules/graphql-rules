import React from 'react';
import { graphql } from 'gatsby';
import Rule from '../components/rule';
import Layout from '../components/layout';

export default function Template(props) {
  const { markdownRemark } = props.data; // data.markdownRemark holds our post data
  const {
    frontmatter: { title, pageType },
    htmlAst,
    fileAbsolutePath = '',
  } = markdownRemark;

  const mdPath = fileAbsolutePath.replace(
    /.*\/docs\/rules\/(.*)$/i,
    'https://github.com/graphql-rules/graphql-rules/edit/master/docs/rules/$1'
  );

  return (
    <Layout>
      <Rule mdPath={mdPath} ruleHtmlAst={htmlAst} title={title} pageType={pageType} />
    </Layout>
  );
}

export const pageQuery = graphql`
  query ($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      htmlAst
      frontmatter {
        path
        title
        pageType
      }
      fileAbsolutePath
    }
  }
`;
