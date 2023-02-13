import colors from '@styles/colors';
import styled from 'styled-components';

export const TagListContainer = styled.ul`
  display: flex;
  flex-wrap: wrap;
  column-gap: 20px;
  row-gap: 10px;

  & li {
    display: flex;
    align-items: center;
    padding: 10px 12px 10px 24px;
    background-color: ${colors.black20};
    color: ${colors.black70};

    & svg {
      margin-left: 10px;
      padding-bottom: 3px;
      font-size: 20px;
      cursor: pointer;
    }

    &:last-child {
      padding: 0;
      background-color: none;
    }
  }
`;

export const TagInputBox = styled.div`
  display: flex;
  border: 1px solid ${colors.black40};
  min-height: 43px;

  & input {
    border: none;
    font-size: 16px;
    padding: 0 12px;
    width: 150px;
  }

  & button {
    border: none;
    background-color: ${colors.black40};
    padding: 0 18px;
    font-size: 16px;
    cursor: pointer;
    color: ${colors.black80};
  }
`;
