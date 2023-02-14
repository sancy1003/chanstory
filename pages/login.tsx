import { NextPage } from 'next';
import { useForm } from 'react-hook-form';
import Head from 'next/head';
import { useRouter } from 'next/router';
import useMutation from '@libs/client/useMutation';
import { useEffect } from 'react';
import { APIResponse } from 'types/response';
import { LoginForm } from 'types/auth';
import * as S from '@styles/pages/login.style';

const Login: NextPage = () => {
  const router = useRouter();
  const {
    register,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>();
  const [login, { data: loginResult, loading }] =
    useMutation<APIResponse>(`/api/user/login`);
  const onSubmit = (data: LoginForm) => {
    if (loading) return;
    login(data);
  };
  const onClickSignUp = () => {
    router.push('/signup');
  };
  useEffect(() => {
    if (loginResult?.result) {
      router.push('/');
    }
  }, [loginResult, router]);
  useEffect(() => {
    if (loginResult && !loginResult.result && loginResult.error) {
      setError('password', {
        type: 'error',
        message: loginResult.error,
      });
    }
  }, [loginResult]);

  return (
    <S.LoginContainer>
      <Head>
        <title>로그인 - chanstory</title>
      </Head>
      <S.LoginContentsBox>
        <S.Logo>chanstory</S.Logo>
        <S.LoginForm onSubmit={handleSubmit(onSubmit)}>
          <S.InputBox>
            <S.Input
              {...register('account', {
                required: '아이디를 입력해주세요.',
              })}
              type="account"
              placeholder={'아이디'}
            />
            <S.InputMessage>{errors?.account?.message}</S.InputMessage>
          </S.InputBox>
          <S.InputBox>
            <S.Input
              {...register('password', {
                required: '비밀번호를 입력해주세요.',
              })}
              type="password"
              placeholder={'비밀번호'}
            />
            <S.InputMessage>{errors?.password?.message}</S.InputMessage>
          </S.InputBox>
          <S.ButtonWrapper>
            <S.BtnLogin onClick={handleSubmit(onSubmit)}>로그인</S.BtnLogin>
          </S.ButtonWrapper>
        </S.LoginForm>
        <S.ButtonWrapper>
          <S.BtnSignup onClick={onClickSignUp}>회원가입</S.BtnSignup>
        </S.ButtonWrapper>
      </S.LoginContentsBox>
    </S.LoginContainer>
  );
};

export default Login;
