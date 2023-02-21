import colors from '@styles/colors';
import styled from 'styled-components';

export const CategoryContainer = styled.div`
  width: 100%;
  margin-bottom: 40px;
`;

export const CategoryTitle = styled.div`
  margin-bottom: 30px;
  font-size: 20px;
  font-weight: bold;
`;

export const CategoryList = styled.ul`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  column-gap: 60px;
  row-gap: 24px;

  & a {
    font-size: 18px;
    cursor: pointer;
    min-width: 50px;
    display: flex;
    justify-content: center;
    color: ${colors.black60};
    position: relative;

    &:hover {
      color: #917fd6;
    }

    &.active {
      color: ${colors.brandColor};
      font-weight: bold;
    }
  }
`;
