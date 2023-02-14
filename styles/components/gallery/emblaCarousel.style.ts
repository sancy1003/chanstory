import colors from '@styles/colors';
import styled from 'styled-components';

export const CarouselContainer = styled.div`
  position: relative;
  background-color: ${colors.black10};
  padding: 20px;
  margin-left: auto;
  margin-right: auto;
`;

export const Viewport = styled.div`
  overflow: hidden;
  width: 100%;
  cursor: move;
  cursor: grab;

  &.is-draggable {
    cursor: move;
    cursor: grab;
  }
  &.is-dragging {
    cursor: grabbing;
  }
`;

export const CarouselImagesContainer = styled.div`
  display: flex;
  user-select: none;
  -webkit-touch-callout: none;
  -khtml-user-select: none;
  -webkit-tap-highlight-color: transparent;
  margin-left: -10px;
`;

export const CarouselImageBox = styled.div`
  padding-left: 10px;
  min-width: 100%;
  position: relative;
`;

export const CarouselImageWrapper = styled.div`
  position: relative;
  overflow: hidden;
  height: 533px;
  object-fit: contain !important;
`;

export const ThumbnailContainer = styled.div`
  position: relative;
  background-color: ${colors.black10};
  padding: 20px;
  margin-left: auto;
  margin-right: auto;
  padding-top: 0;
  margin-top: -12px;
  margin-bottom: 50px;
`;

export const ThumbnailImagesContainer = styled.div`
  display: flex;
  user-select: none;
  -webkit-touch-callout: none;
  -khtml-user-select: none;
  -webkit-tap-highlight-color: transparent;
  cursor: default;
  margin-left: -8px;
`;
