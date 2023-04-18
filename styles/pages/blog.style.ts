import colors from '@styles/colors';
import screens from '@styles/screens';
import styled from 'styled-components';

export const BlogContainer = styled.div`
  width: 100%;
  flex: 1;
  background-color: #fafaf8;
`;

export const BlogContentsContainer = styled.div`
  padding: 60px 20px 100px 20px;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
`;

export const HomeSectionTitle = styled.h2`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #ffffff;
  box-shadow: 0px 6px 6px rgba(0, 0, 0, 0.05);
  border-radius: 8px;
  margin-bottom: 40px;
  padding: 12px 28px;
  font-weight: 600;
  font-size: 18px;
  line-height: 130.18%;
  color: ${colors.brandColor};

  a {
    display: flex;
    align-items: center;
  }
`;

export const BlogSectionHeader = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 40px;
  flex-wrap: wrap;
  row-gap: 28px;

  ${screens.medium} {
    justify-content: flex-end;
  }
`;

export const BlogSearchTitle = styled.p`
  font-size: 20px;
  font-weight: bold;
`;

export const BlogSection = styled.section`
  width: 100%;
  /* margin-bottom: 60px; */

  &:last-child {
    margin-bottom: 0px;
  }

  & .title {
    margin-bottom: 30px;
    font-size: 20px;
    font-weight: bold;
  }
`;

export const PostContainer = styled.div`
  width: 100%;
  display: flex;
  row-gap: 40px;
  flex-wrap: wrap;
  column-gap: 2%;

  ${screens.medium} {
    column-gap: 4%;
  }

  ${screens.small} {
    column-gap: 0%;
  }
`;

export const PaginationIconBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    & svg {
      color: ${colors.brandColor};
    }
  }

  * svg {
    font-size: 24px;
    color: ${colors.black50};
  }
`;

export const PostingForm = styled.form`
  & .titleInput {
    width: 100%;
    padding: 10px 12px;
    margin-bottom: 20px;
    box-sizing: border-box;
    border-radius: 4px;
    border: 1px solid ${colors.black40};
    font-size: 16px;
  }
`;

export const PostingOptionBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;

  & input {
    width: 500px;
    padding: 10px 8px;
    margin-bottom: 20px;
    box-sizing: border-box;
    border-radius: 4px;
    border: 1px solid ${colors.black40};
    font-size: 16px;
  }
`;

export const BtnPost = styled.button`
  padding: 14px 40px;
  background-color: ${colors.brandColor};
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

/* post detail */
export const PostDetailContainer = styled.div`
  padding: 50px 20px;
  width: 100%;
  max-width: 840px;
  margin: 0 auto;
  box-sizing: border-box;
`;

export const PostDetailHeader = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  border-bottom: 1px solid ${colors.black40};
  padding-bottom: 30px;
  margin-bottom: 30px;

  & .registTime {
    font-size: 14px;
    color: ${colors.black70};
  }
`;

export const PostDetailTitleBox = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  padding-right: 30px;
  font-size: 20px;
  font-weight: bold;

  & svg {
    color: ${colors.brandColor};
    margin-right: 40px;
    cursor: pointer;
    padding-bottom: 3px;
  }
`;

export const PostDetailContent = styled.div`
  width: 100%;
  border-bottom: 1px solid ${colors.black40};
  padding-bottom: 20px;
  margin-bottom: 30px;
`;

export const PostDetailTagList = styled.ul`
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
