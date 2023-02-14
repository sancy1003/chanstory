import colors from '@styles/colors';
import styled from 'styled-components';

export const GalleryItemContainer = styled.div`
  width: 100%;
`;

export const ImageBox = styled.div`
  width: 100%;
  position: relative;
  margin-bottom: 16px;
`;

export const ImageWrapper = styled.div`
  width: 100%;
  position: relative;

  & span {
    position: unset !important;
  }

  & img {
    object-fit: cover !important;
    position: relative !important;
    min-height: 300px !important;
    max-height: 450px !important;
    border-radius: 8px;
  }
`;

export const Title = styled.div`
  font-size: 16px;
  margin-bottom: 10px;
  font-weight: bold;
`;

export const Info = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  color: ${colors.black70};
  font-size: 14px;
`;
