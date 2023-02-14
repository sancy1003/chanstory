import styled from 'styled-components';

export const AutoHeightImageWrapper = styled.div`
  position: relative;
  width: 100%;

  & span {
    position: unset !important;
  }

  & img {
    object-fit: cover !important;
    position: relative !important;
    height: auto !important;
  }
`;
