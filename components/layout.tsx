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
  thumbnailURL?: string | null;
  keywords?: string | null;
  url?: string | null;
}

export default function Layout({
  title,
  children,
  user,
  thumbnailURL,
  keywords,
  url,
}: LayoutProps) {
  const router = useRouter();
  const onClickProfile = () => {
    router.push("/profile");
  };
  return (
    <div>
      <Head>
        <title>{title ? `${title} | chanstory` : `chanstory`}</title>
        <meta
          property="og:title"
          content={title ? `${title} | chanstory` : `chanstory`}
        />
        <meta
          property="og:image"
          content={thumbnailURL || "images/logo/default_thumbnail.png"}
        />
        {url && (
          <meta property="og:url" content={`https://www.chanstory.dev${url}`} />
        )}
        {keywords && <meta name="keywords" content={keywords} />}
      </Head>
      <div className={styles.header}>
        <div className={styles.headerWrap}>
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
      </div>
      {children}
    </div>
  );
}
