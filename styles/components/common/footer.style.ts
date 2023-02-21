import colors from '@styles/colors';
import screens from '@styles/screens';
import styled from 'styled-components';

export const FooterContainer = styled.div`
  width: 100%;
  background-color: #cdd5df;

  ${screens.large} {
    padding: 0px 20px;
  }
`;

export const FooterWrapper = styled.div`
  margin: 0 auto;
  width: 100%;
  max-width: 1160px;
  padding: 24px 0;
  display: flex;
  align-items: flex-end;
  color: #424965;
  font-size: 14px;
  justify-content: space-between;
`;

export const FooterCopyright = styled.p`
  color: #424965;
`;

export const FooterInfoBox = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 6px;
  align-items: flex-end;
`;

export const FooterEmail = styled.div`
  display: flex;
  align-items: center;
  column-gap: 8px;

  & svg {
    font-size: 16px;
  }
`;

export const FooterGit = styled.div`
  display: flex;
  align-items: center;
  column-gap: 8px;
  cursor: pointer;

  &:hover {
    color: ${colors.brandColor};
  }
  & svg {
    font-size: 16px;
  }
`;
