import { Link } from 'gatsby';
import React from 'react';
import styled from 'styled-components';

interface Props {
  siteTitle?: string;
  menuTap: () => void;
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
  padding: 24px 0 28px 20px;
`;

const HomeLink = styled(Link)`
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu',
    'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
  font-size: 1.25rem;
  text-decoration: none;
  color: black;
`;

const MobileOnly = styled.div`
  margin-right: 20px;
  @media screen and (min-width: 425px) {
    display: none;
  }
`;

const Header = ({ siteTitle = '', menuTap }: Props) => (
  <Container>
    <Title>
      <HomeLink to="/">{siteTitle}</HomeLink>
    </Title>
    <MobileOnly onClick={menuTap}>Menu</MobileOnly>
  </Container>
);

export default Header;
