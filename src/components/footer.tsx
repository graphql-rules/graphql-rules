import { Link } from 'gatsby';
import React from 'react';

interface Props {
  style?: object;
}

const Footer = ({ style }: Props) => (
  <footer style={style}>
    CC-BY-4.0 {new Date().getFullYear()},{' '}
    <a href="https://twitter.com/nodkz" target="_blank">
      @nodkz
    </a>{' '}
    and <Link to="/rules/credits">awesome folks</Link>
  </footer>
);

export default Footer;
