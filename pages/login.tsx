import { NextPage } from "next";
import styles from "@styles/profile.module.css";
import { useForm } from "react-hook-form";
import Head from "next/head";
import { useRouter } from "next/router";

interface LoginForm {
  account?: string;
  password?: string;
}

const Login: NextPage = () => {
  const router = useRouter();
  const { register, watch, handleSubmit, reset } = useForm<LoginForm>();
  const onSubmit = (data: LoginForm) => {
    console.log(data);
  };
  const onClickSignUp = () => {
    router.push("/signup");
  };

  return (
    <div className={styles.bg}>
      <Head>
        <title>로그인 - chanstory</title>
      </Head>
      <div className={styles.container}>
        <div className={styles.logo}>chanstory</div>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.loginForm}>
          <input
            {...register("account", {
              required: true,
            })}
            type="account"
            placeholder={"아이디"}
            className={styles.formInput}
          />
          <input
            {...register("password", {
              required: true,
            })}
            type="password"
            placeholder={"비밀번호"}
            className={styles.formInput}
            style={{ marginBottom: "50px" }}
          />
          <button onClick={handleSubmit(onSubmit)} className={styles.btnLogin}>
            로그인
          </button>
          <button onClick={onClickSignUp} className={styles.btnSignUp}>
            회원가입
          </button>
          {/* <div className={styles.btnWrap}>
            <div>아이디 찾기</div>
            <div>|</div>
            <div>비밀번호 찾기</div>
          </div> */}
        </form>
      </div>
    </div>
  );
};

export default Login;
