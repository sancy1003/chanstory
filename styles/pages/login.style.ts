import colors from '@styles/colors';
import styled from 'styled-components';

export const LoginContainer = styled.div`
  background-color: ${colors.black10};
  height: 100vh;
  width: 100vw;
  position: absolute;
  top: 0;
  left: 0;
  min-height: 650px;
`;

export const LoginContentsBox = styled.div`
  max-width: 458px;
  padding: 100px 20px 100px 20px;
  box-sizing: border-box;
  margin: 0 auto;
`;

export const Logo = styled.div`
  color: ${colors.brandColor};
  font-weight: bold;
  font-size: 40px;
  text-align: center;
  margin-bottom: 50px;
`;

export const LoginForm = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const InputBox = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;

  & .title {
    font-size: 16px;
    margin-bottom: 10px;
    font-weight: bold;
  }
`;

export const InputMessage = styled.div`
  margin-top: 5px;
  font-size: 13px;
  color: #f93737;
`;

export const Input = styled.input`
  flex: 1;
  border: 1px solid var(--black_40);
  padding: 14px 20px;
  border-radius: 8px;
  font-size: 16px;
`;

export const ButtonWrapper = styled.div`
  width: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
`;

export const BtnLogin = styled.button`
  flex: 1;
  padding: 14px 20px;
  border-radius: 8px;
  margin-bottom: 20px;
  border: 0;
  background-color: var(--brandColor);
  color: #fff;
  cursor: pointer;
`;

export const BtnSignup = styled.button`
  flex: 1;
  padding: 14px 20px;
  border-radius: 8px;
  margin-bottom: 20px;
  border: 0;
  background-color: #fff;
  border: 1px solid var(--black_40);
  color: var(--black_70);
  cursor: pointer;
`;
