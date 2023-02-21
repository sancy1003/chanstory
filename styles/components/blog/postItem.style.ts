import colors from '@styles/colors';
import screens from '@styles/screens';
import styled from 'styled-components';

export const PostItemCard = styled.div`
  width: 23.5%;
  cursor: pointer;
  box-sizing: border-box;
  overflow: hidden;
  background-color: #fff;
  box-shadow: 0px 6px 6px rgba(0, 0, 0, 0.05);

  & img {
    transition: 0.5s all;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-position: center;
    object-fit: cover;
  }

  &:hover img {
    scale: 110%;
  }

  ${screens.medium} {
    width: 48%;
  }

  ${screens.small} {
    width: 100%;
  }
`;

export const ImageWrapper = styled.div`
  width: 100%;
  position: relative;
  overflow: hidden;

  & img {
    transition: 0.5s all;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-position: center;
    object-fit: cover;
  }

  &::before {
    content: '';
    display: block;
    padding-top: 70%;
  }
`;

export const Category = styled.div<{ category: number }>`
  width: fit-content;
  display: inline-block;
  margin-bottom: 12px;
  padding: 4px 16px;
  font-size: 13px;
  border-radius: 3px;

  ${({ category }) => {
    let color;

    switch (category) {
      case 1:
        color = '#54C8F6';
        break;
      case 2:
        color = '#FFA857';
        break;
      case 3:
        color = '#61D338';
        break;
      case 4:
        color = '#FF6D6D';
        break;
    }

    return `
    color: ${color};
    border: 1px solid ${color};
    `;
  }}
`;

export const InfoBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 10px;
`;

export const Title = styled.p`
  height: 44px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  font-size: 16px;
  margin-bottom: 20px;
  font-weight: bold;
  color: ${colors.black100};
  line-height: 24px;
`;

export const CreatedAt = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  color: ${colors.black60};
  font-size: 12px;
`;
