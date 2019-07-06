import React from 'react';
import styled from 'styled-components';

const HEIGHT = 4;
const COLOR = '#444';

const MenuIconContainer = styled.div`
  width: ${HEIGHT * 5}px;
  height: ${HEIGHT * 5}px;
  -webkit-transform: rotate(0deg);
  -moz-transform: rotate(0deg);
  -o-transform: rotate(0deg);
  transform: rotate(0deg);
  -webkit-transition: 0.5s ease-in-out;
  -moz-transition: 0.5s ease-in-out;
  -o-transition: 0.5s ease-in-out;
  transition: 0.5s ease-in-out;
  cursor: pointer;
`;

const MenuIconLine = styled.span<{ closeIcon: boolean }>`
  display: block;
  position: absolute;
  height: ${HEIGHT}px;
  width: 100%;
  background: ${COLOR};
  border-radius: 9px;
  opacity: 1;
  left: 0;
  -webkit-transform: rotate(0deg);
  -moz-transform: rotate(0deg);
  -o-transform: rotate(0deg);
  transform: rotate(0deg);
  -webkit-transition: 0.25s ease-in-out;
  -moz-transition: 0.25s ease-in-out;
  -o-transition: 0.25s ease-in-out;
  transition: 0.25s ease-in-out;

  :nth-child(1) {
    top: 0px;
    ${({ closeIcon }) => !!closeIcon && `top: ${HEIGHT * 2}px; width: 0%; left: 50%;`}
  }
  :nth-child(2) {
    top: ${HEIGHT * 2}px;
    ${({ closeIcon }) =>
      !!closeIcon &&
      `
        -webkit-transform: rotate(45deg);
        -moz-transform: rotate(45deg);
        -o-transform: rotate(45deg);
        transform: rotate(45deg);
      `}
  }
  :nth-child(3) {
    top: ${HEIGHT * 2}px;
    ${({ closeIcon }) =>
      !!closeIcon &&
      `
        -webkit-transform: rotate(-45deg);
        -moz-transform: rotate(-45deg);
        -o-transform: rotate(-45deg);
        transform: rotate(-45deg);
      `}
  }
  :nth-child(4) {
    top: ${HEIGHT * 4}px;
    ${({ closeIcon }) => !!closeIcon && `top: ${HEIGHT * 2}px; width: 0%; left: 50%;`}
  }
`;

interface Props {
  onClick?: () => any;
  closeIcon: boolean;
}

export default function MenuIcon({ onClick, closeIcon }: Props) {
  return (
    <MenuIconContainer onClick={onClick}>
      <MenuIconLine closeIcon={closeIcon} />
      <MenuIconLine closeIcon={closeIcon} />
      <MenuIconLine closeIcon={closeIcon} />
      <MenuIconLine closeIcon={closeIcon} />
    </MenuIconContainer>
  );
}
