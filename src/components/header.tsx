import { Link } from 'gatsby';
import React from 'react';
import styled from 'styled-components';

interface Props {
  siteTitle?: string;
}

const Container = styled.div`
  /* position: fixed; */
  /* top: 0; */
  width: 100%;
  display: flex;
  flex: 1;
  align-items: center;
  /* background-color: greenyellow; */
`;

const Title = styled.div`
  flex: 1;
  padding: 14px 0 18px 20px;
`;

const HomeLink = styled(Link)`
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu',
    'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
  font-size: 1.25rem;
  text-decoration: none;
  color: black;
`;

const Header = ({ siteTitle = '' }: Props) => (
  <Container>
    <Title>
      <HomeLink to="/">{siteTitle}</HomeLink>
    </Title>
  </Container>
);

export default Header;
