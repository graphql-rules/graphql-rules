import React from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';
import rehypeReact from 'rehype-react';
import { visit as unistVisit } from 'unist-util-visit';
import { map as unistMap } from 'unist-util-map';
import unistFind from 'unist-util-find';

interface Props {
  ruleHtmlAst: string;
  title: string;
  mdPath?: string;
  pageType?: string;
}

const Container = styled.div`
  display: flex;
  flex: 1;
  align-content: center;
  align-items: center;
  flex-direction: column;
`;

const RuleContainer = styled.div`
  margin: 0 20px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu',
    'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
  font-size: 1rem;
  line-height: 1.7rem;
  letter-spacing: -0.02rem;
  max-width: 768px;
`;

const RuleBody = styled.div`
  max-width: 90vw;
  word-break: break-word;
`;

const RuleTitle = styled.div`
  font-size: 2rem;
  line-height: 2.25rem;
`;
const RuleDescription = styled.div``;

// TODO: Extract, used in Menu but with different margin
const Hairline = styled.div`
  display: block;
  height: 1px;
  background-color: rgba(135, 134, 131, 0.1);
  margin: 32px 0px 16px 0px;
`;

const RulesList = styled.div`
  display: flex;
  flex-wrap: wrap;
  /* justify-content: center; */
  /* background-color: greenyellow; */
`;

const RuleTile = styled.div`
  width: 352px;
  height: 80px;
  /* background-color: red; */
  margin: 0 24px 24px 0;
  /* z-index: -1; hide shadow behind image */
  box-shadow: 0px 2px 4px 0 rgba(0, 0, 0, 0.07), 0 0 26px -16px rgba(0, 0, 0, 0.12);
  border-radius: 6px;
  display: flex;
`;

const RuleTileHeader = styled(Link)`
  flex: 1;
  margin: 16px 5px 0 32px;
  text-overflow: ellipsis;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu',
    'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
  font-size: 1rem;
  line-height: 1.5rem;
  letter-spacing: -0.01375rem;
  color: rgba(135, 134, 131);
  text-decoration: none;
  text-overflow: ellipsis; /*Only works for 1 line http://hackingui.com/front-end/a-pure-css-solution-for-multiline-text-truncation/*/
  /* Required for text-overflow to do anything */
  /* white-space: nowrap; */
  /* overflow: hidden; */

  /* Fast fix for two lines with elipsis */
  /* Does not work in FF */
  display: -webkit-box;
  height: 59.2px;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 1.625;
`;

const renderAst = new rehypeReact({
  createElement: React.createElement,
  components: {},
}).Compiler;

const renderCardLinksAst = new rehypeReact({
  createElement: React.createElement,
  components: {
    li: (elements) => {
      const { props }: any = unistFind(elements, { type: 'a' }) || {};
      const { href, children }: any = props || {};
      if (!href || !children) return null;
      return (
        <RuleTile>
          <RuleTileHeader to={href}>{children}</RuleTileHeader>
        </RuleTile>
      );
    },
    ul: ({ children }: any) => <RulesList>{children}</RulesList>,
  },
}).Compiler;

function cleanupListNode(ast: any) {
  const children = [];
  // travers only first level of children
  // and pull out only first founded link
  ast.children.forEach((childAst: any) => {
    unistVisit(childAst, (node: any) => {
      if (node.tagName === 'a') {
        children.push({
          tagName: 'li',
          type: 'element',
          properties: {},
          children: [node],
        });
        return false;
      }
    });
  });
  return {
    children,
    tagName: 'ul',
    type: 'element',
    properties: {},
  };
}

function pullOutCardLinks(ast: any): { ast: any; cardLinksAst: any } {
  // clone ast via `unistMap` before modifying it
  // otherwise when user returns back to the current page
  // the modified ast will not contain card-links
  const result = { ast: unistMap(ast, (n) => n), cardLinksAst: null };

  let pullCardLinks = false;
  unistVisit(result.ast, (node: any, index: number, parent: any) => {
    // find comment <-- card-links --> in markdown
    if (node.type === 'comment' && /card\-links/.test(node.value)) {
      pullCardLinks = true;
    }

    // pull out first <ul> from ast after <-- card-links -->
    if (pullCardLinks && node.tagName === 'ul') {
      pullCardLinks = false;
      parent.children.splice(index, 1);
      result.cardLinksAst = cleanupListNode(node);
    }
  });

  return result;
}

export default function Rule({ title, pageType, ruleHtmlAst, mdPath }: Props) {
  const isSectionPage = pageType && pageType === 'section';

  let ast = ruleHtmlAst;
  let cardLinksAst: any;
  if (isSectionPage) {
    const t = pullOutCardLinks(ruleHtmlAst);
    ast = t.ast;
    cardLinksAst = t.cardLinksAst;
  }

  return (
    <Container>
      <RuleContainer>
        <RuleBody>
          {mdPath ? <a href={mdPath}>Edit page</a> : null}
          <RuleTitle>{title}</RuleTitle>
          <Hairline />
          <RuleDescription>
            <div>{renderAst(ast)}</div>
          </RuleDescription>
        </RuleBody>
        {cardLinksAst && renderCardLinksAst(cardLinksAst)}
      </RuleContainer>
    </Container>
  );
}
