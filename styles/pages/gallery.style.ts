import colors from '@styles/colors';
import screens from '@styles/screens';
import styled from 'styled-components';

export const GalleryContainer = styled.div`
  padding: 50px 20px;
  width: 100%;
  max-width: 840px;
  margin: 0 auto;
  box-sizing: border-box;
`;

export const GalleryListContainer = styled.div`
  width: 100%;
  display: flex;
  column-gap: 24px;
`;

export const GalleryList = styled.ul`
  flex: 1;

  & li {
    width: 100%;
    height: fit-content;
    margin-bottom: 50px;
  }

  ${screens.small} {
    display: none;
  }
`;

export const MobileGalleryList = styled.ul`
  display: none;

  ${screens.small} {
    display: block;
    width: 100%;

    & li {
      width: 100%;
      height: fit-content;
      margin-bottom: 50px;
    }
  }
`;

// write

export const UploadLoadingContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: cenyer;
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 999;
`;

export const PostingForm = styled.div`
  & .sectionTitle {
    margin-bottom: 20px;
    font-size: 20px;
    font-weight: bold;
  }
`;

export const PostingTitleBox = styled.div`
  display: flex;
  column-gap: 24px;

  & .titleInput {
    width: 100%;
    padding: 10px 12px;
    margin-bottom: 20px;
    box-sizing: border-box;
    border-radius: 4px;
    border: 1px solid ${colors.black40};
    font-size: 16px;
  }
  & .dateInput {
    width: 150px;
    padding: 10px 12px;
    margin-bottom: 20px;
    box-sizing: border-box;
    border-radius: 4px;
    border: 1px solid ${colors.black40};
    font-size: 16px;
    text-align: right;
  }
`;

export const ImageEditContainer = styled.div`
  margin-bottom: 50px;

  & .imageEmptyBox {
    display: flex;
    width: 100%;
    height: 533px;
    background: ${colors.black20};
    color: ${colors.black70};
    align-items: center;
    justify-content: center;
    margin-bottom: 20px;
  }

  & .imagePrevBox {
    display: flex;
    width: 100%;
    height: 533px;
    background: ${colors.black20};
    margin-bottom: 20px;
    position: relative;

    & button {
      box-shadow: none !important;
      opacity: 70% !important;
    }

    & div {
      background-size: contain !important;
      background-repeat: no-repeat !important;
      background-position: center !important;
    }
  }
`;

export const UploadImageList = styled.ul`
  display: flex;
  column-gap: 10px;
  row-gap: 10px;
  flex-wrap: wrap;

  & li {
    width: 152px;
    height: 152px;
    border-radius: 8px;
    overflow: hidden;
    position: relative;

    & .cover {
      display: none;
      width: 100%;
      height: 100%;
      background-color: rgba(255, 255, 255, 0.6);
      position: absolute;
      padding: 10px;
      text-align: right;
      box-sizing: border-box;

      & svg {
        color: ${colors.black80};
        font-size: 32px;
        cursor: pointer;
      }
    }

    & img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    &:hover .cover {
      display: block;
    }
  }

  & input {
    display: none;
  }
`;

export const BtnUploadImage = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 152px;
  height: 152px;
  border: 3px dashed ${colors.black40};
  border-radius: 8px;
  background-color: #fcfcff;
  color: ${colors.black40};
  font-size: 64px;
  cursor: pointer;
`;

export const ContentTextarea = styled.textarea`
  width: 100%;
  height: 160px;
  padding: 10px 12px;
  margin-bottom: 50px;
  resize: none;
  box-sizing: border-box;
  border-radius: 4px;
  border: 1px solid ${colors.black40};
  font-size: 16px;
`;

export const ButtonBox = styled.div`
  width: 100%;
  text-align: right;
  margin-top: 10px;
`;

export const BtnWrite = styled.button`
  padding: 14px 40px;
  background-color: ${colors.brandColor};
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

// Detail
export const GalleryDetailHeader = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  border-bottom: 1px solid var(--black_40);
  padding-bottom: 30px;
  margin-bottom: 30px;

  & .registTime {
    font-size: 14px;
    color: ${colors.black70};
  }
`;

export const GalleryDetailTitleBox = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  padding-right: 30px;
  font-size: 20px;
  font-weight: bold;

  & svg {
    color: ${colors.brandColor};
    margin-right: 40px;
    padding-bottom: 3px;
    cursor: pointer;
  }
`;

export const GalleryDetailContent = styled.div`
  width: 100%;
  border-bottom: 1px solid ${colors.black40};
  padding-bottom: 20px;
  margin-bottom: 30px;

  & .content {
    font-size: 19px !important;
    line-height: 160%;
    white-space: pre-wrap;
  }
`;

export const GalleryDetailTagList = styled.ul`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  margin-top: 80px;
  column-gap: 20px;
  row-gap: 10px;

  & li {
    background-color: ${colors.black20};
    color: ${colors.black70};
    padding: 10px 24px;
    font-size: 14px;
  }
`;
