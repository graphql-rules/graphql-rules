import React from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';
import rehypeReact from 'rehype-react';
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
  line-height: 1.5rem;
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

// Taken from https://www.tutorialspoint.com/How-do-I-wrap-text-in-a-pre-tag-in-HTML
const Code = styled.pre`
  overflow-x: auto;
  white-space: pre-wrap;
  white-space: -moz-pre-wrap;
  white-space: -pre-wrap;
  white-space: -o-pre-wrap;
  word-wrap: break-word;
  background-color: #f2f2f2;
  padding: 10px;
  border-radius: 5px;
`;

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
  margin: 16px 5px 0 64px;
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
  white-space: nowrap;
  overflow: hidden;
`;

const renderAst = (isSectionPage: boolean) =>
  new rehypeReact({
    createElement: React.createElement,
    components: {
      pre: ({ children }) => <Code>{children}</Code>,
      ul: ({ children }) => {
        return <>{isSectionPage ? null : children}</>;
      },
    },
  }).Compiler;

// Recursively search for the underlying string of list elements
// typical structure <p></p>
const findMenuTitle = (elements) => {
  for (const elem of elements) {
    if (elem && elem !== '\n') {
      if (typeof elem === 'string') {
        return elem;
      }

      const {
        props: { children, href },
      } = elem;

      let res = findMenuTitle(children);
      if (typeof res === 'string') {
        // We need to return an array of children that contain text
        // e.g. given a string "1.1 This is a `rule`" we will get an array
        // ['1.1 This is a', { children: [...]]]
        // so when we find a string we actually need to return a whole array that it belongs to
        res = { children: children, mdPath: href };
      }

      if (res !== null) return res;
    }
  }

  return null;
};

const renderMenuAst = new rehypeReact({
  createElement: React.createElement,
  components: {
    li: ({ children: elements }) => {
      const { children, mdPath } = findMenuTitle(elements) || { children: [], mdPath: '' };
      return (
        <RuleTile>
          <RuleTileHeader to={mdPath}>{children}</RuleTileHeader>
        </RuleTile>
      );
    },
    ul: ({ children }) => <RulesList>{children}</RulesList>,
  },
}).Compiler;

export default function Rule({ title, pageType, ruleHtmlAst, mdPath }: Props) {
  const isSectionPage = pageType && pageType === 'section';
  const menuItems = isSectionPage
    ? unistFind(ruleHtmlAst, { type: 'element', tagName: 'ul' })
    : null;
  return (
    <Container>
      <RuleContainer>
        <RuleBody>
          {mdPath ? <a href={mdPath}>Edit page</a> : null}
          <RuleTitle>{title}</RuleTitle>
          <Hairline />
          <RuleDescription>
            <div>{renderAst(isSectionPage)(ruleHtmlAst)}</div>
          </RuleDescription>
        </RuleBody>
        {menuItems && <RulesList>{renderMenuAst(menuItems)}</RulesList>}
      </RuleContainer>
    </Container>
  );
}
