import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import Layout from '../components/layout';
// import Image from '../components/image';
import SEO from '../components/seo';
import Rule from '../components/rule';

function IndexPage() {
  const { markdownRemark } = useStaticQuery(
    graphql`
      query {
        markdownRemark(fileAbsolutePath: { glob: "**/rules/README.md" }) {
          htmlAst
        }
      }
    `
  );

  return (
    <Layout>
      <SEO title="Home" />
      <Rule ruleHtmlAst={markdownRemark.htmlAst} title={''} />
    </Layout>
  );
}

export default IndexPage;
