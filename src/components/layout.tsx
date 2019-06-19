/**
 * Layout component that queries for data
 * with Gatsby's StaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/static-query/
 */

import React, { Fragment } from 'react';
import { StaticQuery, graphql } from 'gatsby';
import Footer from './footer';

import Menu from './menu';
import Header from './header';

import styled from 'styled-components';

interface Props {
  children: React.ReactNode;
  hideMenu?: boolean;
}

interface State {
  isMenuOpened: boolean;
}

const Body = styled.div`
  /* background-color: rebeccapurple; */
  display: flex;
  flex-direction: column;
`;

const Container = styled.div`
  display: flex;
`;

const DesktopOnly = styled.div`
  @media screen and (max-width: 425px) {
    display: none;
  }
`;

const MobileMenu = styled.div`
  height: 100%;
  overflow-x: hidden; /* Disable horizontal scroll */
  transition: 0.5s; /* 0.5 second transition effect to slide in or slide down the overlay (height or width, depending on reveal) */
  /* background-color: burlywood; */
`;

class Layout extends React.Component<Props, State> {
  state: State = { isMenuOpened: false };

  _openMenu = () => {
    this.setState((prevState) => ({
      isMenuOpened: !prevState.isMenuOpened,
    }));
  };

  render() {
    const { children, hideMenu } = this.props;
    const { isMenuOpened } = this.state;
    return (
      <StaticQuery
        query={graphql`
          query SiteTitleQuery {
            site {
              siteMetadata {
                title
              }
            }
          }
        `}
        render={(data) => (
          <Body>
            <Header siteTitle={data.site.siteMetadata.title} menuTap={this._openMenu} />
            {isMenuOpened && (
              <MobileMenu>
                <Menu />
              </MobileMenu>
            )}
            {!isMenuOpened && (
              <Fragment>
                <Container>
                  {!hideMenu && (
                    <DesktopOnly>
                      <Menu />
                    </DesktopOnly>
                  )}
                  {children}
                </Container>
                <Footer />
              </Fragment>
            )}
          </Body>
        )}
      />
    );
  }
}

export default Layout;
