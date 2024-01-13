import React from 'react';
import { useStaticQuery, graphql, Link } from 'gatsby';
import unistFind from 'unist-util-find';
import rehypeReact from 'rehype-react';
import styled from 'styled-components';

const MenuItem = styled(Link)`
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu',
    'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
  text-decoration: none;
  line-height: 1.5rem;
  display: inline-block;
  letter-spacing: -0.0175rem;
  font-size: 0.875rem;
  margin-bottom: 0.5rem;

  color: #333;

  &:hover {
    color: #000;
  }

  &.active {
    font-weight: bold;
    background-color: rgba(135, 134, 131, 0.1);
  }
`;

const MenuContainer = styled.ul`
  padding-inline-start: 0;
  list-style-type: none;
  margin-left: 20px;
`;

const renderAst = new rehypeReact({
  createElement: React.createElement,
  components: {
    a: ({ href, children }: any) => (
      <MenuItem to={href} activeClassName="active">
        {children}
      </MenuItem>
    ),
    ul: ({ children }: any) => <MenuContainer>{children}</MenuContainer>,
  },
}).Compiler;

const Container = styled.div`
  max-width: 300px;
`;

const Hairline = styled.div`
  height: 1px;
  background-color: rgba(135, 134, 131, 0.1);
  margin: 0 20px;
`;

/**
 * Menu items loads from first <UL>
 * https://github.com/graphql-rules/graphql-rules/blob/master/docs/rules/README.md
 */
export default function Menu() {
  const { markdownRemark } = useStaticQuery(graphql`
    query {
      markdownRemark(fileAbsolutePath: { glob: "**/rules/README.md" }) {
        htmlAst
      }
    }
  `);

  const data = unistFind(markdownRemark.htmlAst, { type: 'element', tagName: 'ul' });

  return (
    <Container>
      <Hairline />
      <div>{renderAst(data)}</div>
    </Container>
  );
}
