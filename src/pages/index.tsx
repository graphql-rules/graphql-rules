import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import Layout from '../components/layout';
// import Image from '../components/image';
import SEO from '../components/seo';
import Rule from '../components/rule';

function IndexPage() {
  const {
    markdownRemark: {
      htmlAst,
      frontmatter: { pageType },
    },
  } = useStaticQuery(
    graphql`
      query {
        markdownRemark(fileAbsolutePath: { glob: "**/rules/README.md" }) {
          htmlAst
          frontmatter {
            pageType
          }
        }
      }
    `
  );

  return (
    <Layout>
      <SEO title="Home" />
      <Rule ruleHtmlAst={htmlAst} pageType={pageType} title={''} />
    </Layout>
  );
}

export default IndexPage;
