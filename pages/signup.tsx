import { NextPage } from 'next';
import { useForm } from 'react-hook-form';
import Head from 'next/head';
import { useRouter } from 'next/router';
import useMutation from '@libs/client/useMutation';
import { useEffect } from 'react';
import { APIResponse } from 'types/response';
import { SignupForm } from 'types/auth';
import * as S from '@styles/pages/login.style';

const Signup: NextPage = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    getValues,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<SignupForm>();
  const [signup, { data: signupResult, loading }] =
    useMutation<APIResponse>(`/api/user/signup`);
  const onSubmit = (data: SignupForm) => {
    if (loading) return;
    clearErrors(['account', 'nickname']);
    signup(data);
  };

  useEffect(() => {
    if (signupResult && signupResult.result) {
      router.push('/login');
    } else if (signupResult && !signupResult.result && signupResult.error) {
      if (signupResult.error === '이미 사용중인 아이디가 있어요.') {
        setError('account', {
          type: 'alreadyExists',
          message: signupResult.error,
        });
      } else if (signupResult.error === '이미 사용중인 닉네임이 있어요.') {
        setError('nickname', {
          type: 'alreadyExists',
          message: signupResult.error,
        });
      }
    }
  }, [signupResult]);

  return (
    <S.LoginContainer>
      <Head>
        <title>회원가입 - chanstory</title>
      </Head>
      <S.LoginContentsBox>
        <S.Logo>chanstory</S.Logo>
        <S.LoginForm onSubmit={handleSubmit(onSubmit)}>
          <S.InputBox>
            <div className="title">아이디</div>
            <S.Input
              {...register('account', {
                required: '사용하실 아이디를 입력해주세요.',
                minLength: {
                  value: 4,
                  message: '아이디가 너무 짧아요. (4 ~ 20자)',
                },
                maxLength: {
                  value: 20,
                  message: '아이디가 너무 길어요. (4 ~ 20자)',
                },
                pattern: {
                  value: /^[a-z0-9_-]{4,20}$/,
                  message: '아이디는 소문자 및 영문만 입력 가능합니다.',
                },
              })}
              maxLength={20}
              required
              type="account"
              placeholder={'4 ~ 20자'}
            />
            <S.InputMessage>{errors?.account?.message}</S.InputMessage>
          </S.InputBox>
          <S.InputBox>
            <div className="title">비밀번호</div>
            <S.Input
              {...register('password', {
                required: '비밀번호를 입력해주세요.',
                minLength: {
                  value: 6,
                  message: '비밀번호가 너무 짧아요. (6 ~ 20자)',
                },
                maxLength: {
                  value: 20,
                  message: '비밀번호가 너무 길어요. (6 ~ 20자)',
                },
              })}
              type="password"
              maxLength={20}
              placeholder={'6 ~ 20자'}
              required
            />
            <S.InputMessage>{errors?.password?.message}</S.InputMessage>
          </S.InputBox>
          <S.InputBox>
            <div className="title">비밀번호 확인</div>
            <S.Input
              {...register('passwordConfirm', {
                required: '비밀번호 확인란을 입력해주세요.',
                validate: {
                  confirm: () =>
                    getValues().password === getValues().passwordConfirm ||
                    '비밀번호가 일치하지 않습니다.',
                },
              })}
              type="password"
              maxLength={20}
              placeholder={'6 ~ 20자'}
            />
            <S.InputMessage>{errors?.passwordConfirm?.message}</S.InputMessage>
          </S.InputBox>
          <S.InputBox>
            <div className="title">닉네임</div>
            <S.Input
              {...register('nickname', {
                required: '사용하실 닉네임을 입력해주세요.',
                minLength: {
                  value: 2,
                  message: '닉네임이 너무 짧아요. (2 ~ 16자)',
                },
                maxLength: {
                  value: 16,
                  message: '닉네임이 너무 길어요. (2 ~ 16자)',
                },
              })}
              maxLength={16}
              type="text"
              placeholder={'2 ~ 16자'}
            />
            <S.InputMessage>{errors?.nickname?.message}</S.InputMessage>
          </S.InputBox>
          <S.BtnLogin onClick={handleSubmit(onSubmit)}>가입하기</S.BtnLogin>
        </S.LoginForm>
      </S.LoginContentsBox>
    </S.LoginContainer>
  );
};

export default Signup;
