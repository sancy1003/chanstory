import styled from 'styled-components';

export const ThumbnailContainer = styled.div`
  padding-left: 10px;
  position: relative;
  padding-left: 8px;
  min-width: 20%;
`;

export const BtnImage = styled.button`
  overflow: hidden;
  object-fit: cover;
  touch-action: manipulation;
  cursor: pointer;
  border: 0;
  outline: 0;
  margin: 0;
  padding: 0;
  height: 100px;
  width: 100%;
  background-color: transparent;
  position: relative;
  display: block;
  overflow: hidden;
`;

export const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  opacity: 0.5;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.7;
  }

  &.isSelected {
    opacity: 1;
  }

  & img {
    object-fit: cover;
  }
`;
