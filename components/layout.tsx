import React from "react";
import Link from "next/link";
import Head from "next/head";
import styles from "@styles/Layout.module.css";
import { SessionUserData } from "@libs/server/withSession";
import { useRouter } from "next/router";
import { formattingImageURL } from "@libs/client/commonFunction";

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
  user?: SessionUserData | null;
}

export default function Layout({ title, children, user }: LayoutProps) {
  const router = useRouter();
  const onClickProfile = () => {
    router.push("/profile");
  };
  return (
    <div>
      <Head>
        <title>{title ? `${title} - chanstory` : `chanstory`}</title>
      </Head>
      <div className={styles.header}>
        <Link href={"/"}>
          <a className={styles.logo}>
            <img src={"/images/logo/logo.svg"} />
          </a>
        </Link>
        {user ? (
          <div className={styles.userWrap} onClick={onClickProfile}>
            <img
              src={formattingImageURL(user?.profileURL, "avatar")}
              className={styles.userProfileImage}
            />
            <div className={styles.userNickname}>{user.nickname}</div>
          </div>
        ) : (
          <Link href={"/login"}>
            <a className={styles.login}>로그인</a>
          </Link>
        )}
      </div>
      {children}
    </div>
  );
}
