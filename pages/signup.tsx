import { NextPage } from "next";
import styles from "@styles/profile.module.css";
import { useForm } from "react-hook-form";
import Head from "next/head";
import { useRouter } from "next/router";

interface SignupForm {
  account: string;
  password: string;
  passwordConfirm: string;
  nickname: string;
}

const Signup: NextPage = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<SignupForm>();
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
          <div className={styles.formInputWrap}>
            <div className={styles.inputTitle}>아이디</div>
            <input
              {...register("account", {
                required: "사용하실 아이디를 입력해주세요.",
                minLength: {
                  value: 6,
                  message: "아이디가 너무 짧아요. (4 ~ 20자)",
                },
                maxLength: {
                  value: 20,
                  message: "아이디가 너무 길어요. (4 ~ 20자)",
                },
                pattern: {
                  value: /^[a-z0-9_-]{4,20}$/,
                  message: "아이디는 소문자 및 영문만 입력 가능합니다.",
                },
              })}
              maxLength={20}
              required
              type="account"
              placeholder={"6 ~ 20자"}
              className={styles.formInput}
            />
            <div className={styles.formInputWarn}>
              {errors?.account?.message}
            </div>
          </div>
          <div className={styles.formInputWrap}>
            <div className={styles.inputTitle}>비밀번호</div>
            <input
              {...register("password", {
                required: "비밀번호를 입력해주세요.",
                minLength: {
                  value: 6,
                  message: "비밀번호가 너무 짧아요. (6 ~ 20자)",
                },
                maxLength: {
                  value: 20,
                  message: "비밀번호가 너무 길어요. (6 ~ 20자)",
                },
              })}
              type="password"
              maxLength={20}
              placeholder={"6 ~ 20자"}
              className={styles.formInput}
              required
            />
            <div className={styles.formInputWarn}>
              {errors?.password?.message}
            </div>
          </div>
          <div className={styles.formInputWrap}>
            <div className={styles.inputTitle}>비밀번호 확인</div>
            <input
              {...register("passwordConfirm", {
                required: "비밀번호 확인란을 입력해주세요.",
                validate: {
                  confirm: (v) =>
                    getValues().password === getValues().passwordConfirm ||
                    "비밀번호가 일치하지 않습니다.",
                },
              })}
              type="password"
              maxLength={20}
              placeholder={"6 ~ 20자"}
              className={styles.formInput}
            />
            <div className={styles.formInputWarn}>
              {errors?.passwordConfirm?.message}
            </div>
          </div>
          <div className={styles.formInputWrap}>
            <div className={styles.inputTitle}>닉네임</div>
            <input
              {...register("nickname", {
                required: "사용하실 닉네임을 입력해주세요.",
                minLength: {
                  value: 2,
                  message: "닉네임이 너무 짧아요. (4 ~ 16자)",
                },
                maxLength: {
                  value: 16,
                  message: "닉네임이 너무 길어요. (2 ~ 16자)",
                },
              })}
              maxLength={16}
              type="text"
              placeholder={"2 ~ 16자"}
              className={styles.formInput}
            />
            <div className={styles.formInputWarn}>
              {errors?.nickname?.message}
            </div>
          </div>
          <button onClick={handleSubmit(onSubmit)} className={styles.btnLogin}>
            가입하기
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
