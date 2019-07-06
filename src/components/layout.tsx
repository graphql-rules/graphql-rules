import React from 'react';
import { StaticQuery, graphql } from 'gatsby';
import Footer from './footer';

import Menu from './menu';
import MenuIcon from './menuIcon';
import Header from './header';

import styled from 'styled-components';

interface Props {
  children: React.ReactNode;
  hideMenu?: boolean;
}

interface State {
  isMenuOpened: boolean;
}

const MEDIA_FOR_OVERFLOW_MENU = '@media (max-width: 900px)';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const presets = {
  headerHeight: '50px',
  menuWidth: '350px',
};

const ContainerHeader = styled.div`
  position: fixed;
  top: 0;
  background: white;
  border-bottom: 1px solid rgba(135, 134, 131, 0.1);
  height: ${presets.headerHeight};
  overflow: hidden; // Do not remove! Better to fix 'headerHeight' value
  width: 100%;
  z-index: 100;
  ${MEDIA_FOR_OVERFLOW_MENU} {
    position: absolute;
  }
`;

const Body = styled.div`
  margin-top: ${presets.headerHeight};
  flex: 1 0 auto;
  display: flex;
`;

const SHADOW_WIDTH = '24px';
const BodyLeft = styled.div<{ isMenuOpened: boolean }>`
  flex: 0 0 auto;
  max-height: calc(100vh - ${presets.headerHeight});
  margin-right: ${SHADOW_WIDTH};
  width: calc(${presets.menuWidth} - ${SHADOW_WIDTH});
  overflow: auto;
  position: fixed;
  box-shadow: rgba(46, 41, 51, 0.08) 0px 4px 16px, rgba(71, 63, 79, 0.16) 0px 8px ${SHADOW_WIDTH};
  ${MEDIA_FOR_OVERFLOW_MENU} {
    background-color: white;
    top: 0;
    height: 100vh;
    max-height: 100vh;
    bottom: 0;
    display: ${({ isMenuOpened }) => (isMenuOpened ? 'block' : 'none')};
    z-index: 100;
  }
`;

const BodyCenter = styled.div`
  background: white;
  z-index: 2;
  padding-top: 15px;
  flex: 1 0 100wh;
  margin-left: ${presets.menuWidth};
  ${MEDIA_FOR_OVERFLOW_MENU} {
    margin-left: 0;
    margin-bottom: 100px; // add space to avoid icon overlapping on text
  }
`;

const BodyRight = styled.div`
  background: tomato;
  flex: 0 0 auto;
`;

const MenuIconBG = styled.div`
  display: none; // Invisible by default
  position: fixed;
  bottom: 30px;
  right: 50px;
  background: #ccc;
  padding: 15px;
  border-radius: 50px;
  z-index: 1000;
  ${MEDIA_FOR_OVERFLOW_MENU} {
    display: block; // Visible on small screens
  }
`;

class Layout extends React.Component<Props, State> {
  state: State = { isMenuOpened: false };

  toogleOverflowMenu = () => {
    this.setState((prevState) => ({
      isMenuOpened: !prevState.isMenuOpened,
    }));
  };

  render() {
    const { children } = this.props;
    const { isMenuOpened } = this.state;

    return (
      <Container>
        <ContainerHeader>
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
            render={(data) => <Header siteTitle={data.site.siteMetadata.title} />}
          />
        </ContainerHeader>

        <Body>
          <BodyLeft isMenuOpened={isMenuOpened}>
            <Menu />
          </BodyLeft>
          <BodyCenter>
            {children}
            <Footer />
          </BodyCenter>
          <BodyRight />
        </Body>

        <MenuIconBG onClick={this.toogleOverflowMenu}>
          <MenuIcon closeIcon={isMenuOpened} />
        </MenuIconBG>
      </Container>
    );
  }
}

export default Layout;
