import { NextPage } from "next";
import styles from "@styles/profile.module.css";
import { useForm } from "react-hook-form";
import Head from "next/head";
import { useRouter } from "next/router";
import useMutation from "@libs/client/useMutation";
import { useEffect } from "react";

interface LoginForm {
  account?: string;
  password?: string;
}

interface LoginResult {
  result: boolean;
  error?: string;
}

const Login: NextPage = () => {
  const router = useRouter();
  const {
    register,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>();
  const [login, { data: loginResult, loading }] =
    useMutation<LoginResult>(`/api/user/login`);
  const onSubmit = (data: LoginForm) => {
    if (loading) return;
    login(data);
  };
  const onClickSignUp = () => {
    router.push("/signup");
  };
  useEffect(() => {
    if (loginResult?.result) {
      router.push("/");
    }
  }, [loginResult, router]);
  useEffect(() => {
    if (loginResult && !loginResult.result && loginResult.error) {
      setError("password", {
        type: "error",
        message: loginResult.error,
      });
    }
  }, [loginResult]);

  return (
    <div className={styles.bg}>
      <Head>
        <title>로그인 - chanstory</title>
      </Head>
      <div className={styles.container}>
        <div className={styles.logo}>chanstory</div>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.loginForm}>
          <div className={styles.formInputWrap}>
            <input
              {...register("account", {
                required: "아이디를 입력해주세요.",
              })}
              type="account"
              placeholder={"아이디"}
              className={styles.formInput}
            />
            <div className={styles.formInputWarn}>
              {errors?.account?.message}
            </div>
          </div>
          <div className={styles.formInputWrap}>
            <input
              {...register("password", {
                required: "비밀번호를 입력해주세요.",
              })}
              type="password"
              placeholder={"비밀번호"}
              className={styles.formInput}
            />
            <div className={styles.formInputWarn}>
              {errors?.password?.message}
            </div>
          </div>
          <div className={styles.btnWrap}>
            <button
              onClick={handleSubmit(onSubmit)}
              className={styles.btnLogin}
            >
              로그인
            </button>
          </div>
          {/* <div className={styles.btnWrap}>
            <div>아이디 찾기</div>
            <div>|</div>
            <div>비밀번호 찾기</div>
          </div> */}
        </form>
        <div className={styles.btnWrap}>
          <button onClick={onClickSignUp} className={styles.btnSignUp}>
            회원가입
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
