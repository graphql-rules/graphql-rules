import React from 'react';
import { useStaticQuery, graphql, Link } from 'gatsby';
import unistFind from 'unist-util-find';
import rehypeReact from 'rehype-react';

const renderAst = new rehypeReact({
  createElement: React.createElement,
  components: {
    a: ({ href, children }) => <Link to={href}>{children}</Link>,
    ul: ({ children }) => <ul style={{ listStyleType: 'none', marginLeft: '10px' }}>{children}</ul>,
  },
}).Compiler;

/**
 * Menu items loads from first <UL>
 * https://github.com/graphql-rules/graphql-rules/blob/master/docs/rules/README.md
 */
export default function Menu() {
  const { markdownRemark } = useStaticQuery(
    graphql`
      query {
        markdownRemark(fileAbsolutePath: { glob: "**/rules/README.md" }) {
          htmlAst
        }
      }
    `
  );

  let data = unistFind(markdownRemark.htmlAst, { type: 'element', tagName: 'ul' });
  // console.log(data);
  return <div>{renderAst(data)}</div>;
}
