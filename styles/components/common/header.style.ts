import colors from '@styles/colors';
import screens from '@styles/screens';
import styled from 'styled-components';

export const HeaderContainer = styled.div<{ position: number }>`
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  height: 60px;
  z-index: 3;
  transition: background-color 0.4s ease-in-out, box-shadow 0.4s ease-in-out;

  ${({ position }) => {
    if (position > 0) {
      return `
    background-color: #fff;
    box-shadow: 0px 5px 7px rgba(0, 0, 0, 0.03);`;
    }
  }}

  ${screens.large} {
    padding: 0px 20px;
  }
`;

export const HeaderWrapper = styled.div`
  margin: 0 auto;
  width: 100%;
  max-width: 1160px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;

  & .mainLogo {
    position: relative;
    height: 60px;
    width: 100px;
    display: flex;
    align-items: center;
    object-fit: contain;
  }
`;

export const Navbar = styled.nav`
  & ul {
    display: flex;
    align-items: center;
    margin-left: 132px;
    column-gap: 64px;

    ${screens.medium} {
      margin-left: 10vw;
      column-gap: 32px;
    }

    ${screens.small} {
      display: none;
    }
  }

  & a {
    color: ${colors.black60};
    cursor: pointer;
  }

  & a.active {
    color: ${colors.brandColor};
    font-weight: bold;
  }
`;
