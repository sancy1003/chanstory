import colors from '@styles/colors';
import screens from '@styles/screens';
import styled from 'styled-components';

export const ConfirmModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding: 10px;
  z-index: 10;
`;

export const ConfirmModalBox = styled.div`
  background-color: #fff;
  border-radius: 6px;
  padding: 20px 26px;
  margin-top: 20vh;
  min-width: 250px;
  box-shadow: 0px 10px 10px rgba(0, 0, 0, 0.1);

  ${screens.small} {
    min-width: unset;
  }
`;

export const Message = styled.div`
  white-space: pre-line;
  margin-bottom: 20px;
`;

export const ButtonBox = styled.div`
  display: flex;
  justify-content: flex-end;
  column-gap: 10px;

  & button {
    padding: 5px 20px;
    cursor: pointer;
    border: none;
    border-radius: 4px;
    background-color: ${colors.brandColor};
    border: 1px solid ${colors.brandColor};
    color: #fff;
  }

  ${screens.small} {
    flex-direction: column;

    & button {
      padding: 14px 10px;
      cursor: pointer;

      &:nth-child(1) {
        margin-bottom: 10px;
        margin-right: 0;
      }
    }
  }
`;
