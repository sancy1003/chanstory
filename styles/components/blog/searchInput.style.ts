import colors from '@styles/colors';
import screens from '@styles/screens';
import styled from 'styled-components';

export const BlogPostSearchForm = styled.form`
  display: flex;
  align-items: center;
  border: 1px solid ${colors.black30};
  background: #fff;
  border-radius: 8px;
  padding: 12px 14px;
  width: 240px;

  &:focus-within {
    border: 1px solid ${colors.brandColor};
  }

  button {
    display: flex;
    align-items: center;
    background: none;
    border: none;
    width: 30px;
    height: 100%;
    cursor: pointer;

    svg {
      color: ${colors.brandColor};
    }
  }

  ${screens.small} {
    width: 100%;
  }
`;

export const BlogPostSearchInput = styled.input`
  flex: 1;
  border: none;
  padding: 0;
  background: none;
  font-size: 14px;

  &::placeholder {
    color: ${colors.black50};
  }

  &:focus {
    outline: none;
  }
`;
