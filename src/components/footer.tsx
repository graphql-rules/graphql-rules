import { Link } from 'gatsby';
import React from 'react';
import styled from 'styled-components';

const Container = styled.footer`
  padding: 10px 30px;
  margin-top: 10px;
  font-size: 0.875rem;
  border: 1px solid rgba(135, 134, 131, 0.1);
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu',
    'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
`;

const Footer = () => (
  <Container>
    <a href="https://creativecommons.org/licenses/by/4.0/" target="_blank">
      CC-BY-4.0
    </a>{' '}
    {new Date().getFullYear()},{' '}
    <a href="https://twitter.com/nodkz" target="_blank">
      @nodkz
    </a>{' '}
    and <Link to="/rules/credits">awesome folks</Link>
  </Container>
);

export default Footer;
