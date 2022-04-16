import { NextPage } from "next";
import styles from "@styles/profile.module.css";
import { useForm } from "react-hook-form";
import Head from "next/head";
import { useRouter } from "next/router";

interface SignupForm {
  email: string;
  password: string;
  passwordConfirm: string;
  nickname: string;
}

const Signup: NextPage = () => {
  const router = useRouter();
  const { register, watch, handleSubmit, reset } = useForm<SignupForm>();
  const onSubmit = (data: SignupForm) => {
    console.log(data);
  };

  return (
    <div className={styles.bg}>
      <Head>
        <title>회원가입 - chanstory</title>
      </Head>
      <div className={styles.container}>
        <div className={styles.logo}>chanstory</div>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.loginForm}>
          <div className={styles.inputTitle}>아이디 (이메일)</div>
          <input
            {...register("email", {
              required: true,
            })}
            type="email"
            placeholder={"아이디 (이메일)"}
            className={styles.formInput}
          />
          <div className={styles.inputTitle}>비밀번호</div>
          <input
            {...register("password", {
              required: true,
            })}
            type="password"
            placeholder={"6 ~ 20자"}
            className={styles.formInput}
          />
          <div className={styles.inputTitle}>비밀번호 확인</div>
          <input
            {...register("passwordConfirm", {
              required: true,
            })}
            type="password"
            placeholder={"6 ~ 20자"}
            className={styles.formInput}
          />
          <div className={styles.inputTitle}>닉네임</div>
          <input
            {...register("nickname", {
              required: true,
            })}
            type="text"
            placeholder={"2 ~ 16자"}
            className={styles.formInput}
            style={{ marginBottom: "50px" }}
          />
          <button onClick={handleSubmit(onSubmit)} className={styles.btnLogin}>
            가입하기
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
