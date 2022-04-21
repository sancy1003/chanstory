import React from "react";
import Link from "next/link";
import Head from "next/head";
import styles from "@styles/Layout.module.css";
import { SessionUserData } from "@libs/server/withSession";
import { useRouter } from "next/router";

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
          <a className={styles.logo}>Chanstory</a>
        </Link>
        {user ? (
          <div className={styles.userWrap} onClick={onClickProfile}>
            <img
              src={
                user.profileURL
                  ? `https://imagedelivery.net/R2WiK4wfRK3oBXTwjgzQfA/${user?.profileURL}/avatar`
                  : "https://mblogthumb-phinf.pstatic.net/MjAyMTAxMTBfMzEg/MDAxNjEwMjY1OTUzMDYw.AxFQ9Wdgv12xNiWneVpoLZGvpPRT1n2P4dWJ133saWIg.QbSPY2ColrEk1IhmRlxh8kacD6r1SBEp6b2hdjVHRU4g.JPEG.wjswldms0191/IMG_6859.jpg?type=w800"
              }
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
