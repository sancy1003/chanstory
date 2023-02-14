import colors from '@styles/colors';
import styled from 'styled-components';

export const CategoryContainer = styled.div`
  width: 100%;
  margin-bottom: 60px;
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
  gap: 20px 8px;

  & a {
    border-radius: 100px;
    font-size: 18px;
    margin-right: 25px;
    cursor: pointer;
    min-width: 50px;
    display: flex;
    justify-content: center;
    color: ${colors.black70};
    background-color: #fff;
    padding: 10px 16px;

    &.active {
      background-color: ${colors.brandColorWeak};
      color: ${colors.brandColor};
      padding: 10px 16px;
    }
  }
`;
