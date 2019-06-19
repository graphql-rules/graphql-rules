import React from 'react';
import Footer from '../components/footer';
import styled from 'styled-components';
import rehypeReact from 'rehype-react';

interface Props {
  ruleHtmlAst: string;
  title: string;
  mdPath?: string;
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

const RuleBody = styled.div``;

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
`;

// TODO: Extract, used in Menu but with different margin
const Hairline = styled.div`
  display: block;
  height: 1px;
  background-color: rgba(135, 134, 131, 0.1);
  margin: 32px 0px 16px 0px;
`;

const renderAst = new rehypeReact({
  createElement: React.createElement,
  components: {
    pre: ({ href, children }) => <Code to={href}>{children}</Code>,
  },
}).Compiler;

export default function Rule({ title, ruleHtmlAst, mdPath }: Props) {
  return (
    <Container>
      <RuleContainer>
        <RuleBody>
          {mdPath ? <a href={mdPath}>Edit page</a> : null}
          <RuleTitle>{title}</RuleTitle>
          <Hairline />
          <RuleDescription>
            <div>{renderAst(ruleHtmlAst)}</div>
          </RuleDescription>
        </RuleBody>
        <Footer />
      </RuleContainer>
    </Container>
  );
}
