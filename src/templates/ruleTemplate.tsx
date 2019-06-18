import React from 'react';
import { graphql, Link } from 'gatsby';
import Menu from '../components/menu';
import Footer from '../components/footer';

export default function Template({
  data, // this prop will be injected by the GraphQL query below.
}) {
  const { markdownRemark } = data; // data.markdownRemark holds our post data
  const { frontmatter, html, fileAbsolutePath = '' } = markdownRemark;

  const mdPath = fileAbsolutePath.replace(
    /.*\/docs\/rules\/(.*)$/i,
    'https://github.com/graphql-rules/graphql-rules/edit/master/docs/rules/$1'
  );

  return (
    <div>
      <header
        style={{
          background: `rebeccapurple`,
          padding: '10px 30px',
          marginBottom: '10px',
        }}
      >
        <Link to="/" style={{ color: 'white' }}>
          ← Main Page
        </Link>
      </header>

      <div style={{ display: 'flex' }}>
        <div
          style={{
            margin: '25px',
            paddingRight: '10px',
            flex: '300px 0 0',
          }}
        >
          <Menu />
        </div>
        <div style={{ margin: '25px' }}>
          <a href={mdPath}>Edit page</a>
          <h1>{frontmatter.title}</h1>
          <div dangerouslySetInnerHTML={{ __html: html }} />
        </div>
      </div>

      <Footer
        style={{
          padding: '10px 30px',
          marginTop: '10px',
        }}
      />
    </div>
  );
}

export const pageQuery = graphql`
  query($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        path
        title
      }
      fileAbsolutePath
    }
  }
`;
