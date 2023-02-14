import colors from '@styles/colors';
import screens from '@styles/screens';
import styled from 'styled-components';

export const PostItemCard = styled.div`
  width: 23.5%;
  cursor: pointer;
  box-sizing: border-box;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0px 5px 7px rgba(0, 0, 0, 0.1);

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

export const InfoBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 10px;
`;

export const Title = styled.p`
  height: 40px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  font-size: 16px;
  margin-bottom: 20px;
  font-weight: bold;
  color: ${colors.black100};
`;

export const Info = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  color: ${colors.black70};
  font-size: 14px;
`;
