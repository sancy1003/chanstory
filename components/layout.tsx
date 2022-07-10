import React from "react";
import Link from "next/link";
import Head from "next/head";
import styles from "@styles/Layout.module.css";
import { SessionUserData } from "@libs/server/withSession";
import { formattingUserProfileURL } from "@libs/client/commonFunction";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
  user?: SessionUserData | null;
  thumbnailURL?: string | null;
  keywords?: string | null;
  url?: string;
  userLoading?: boolean;
  description?: string;
  activeMenu: "BLOG" | "GALLERY" | "NONE";
}

export default function Layout({
  title,
  children,
  user,
  thumbnailURL,
  keywords,
  url,
  userLoading,
  activeMenu,
  description,
}: LayoutProps) {
  return (
    <div>
      <Head>
        <title>{title ? `${title} | chanstory` : `chanstory`}</title>
        <meta
          property="description"
          content={
            description && description.length > 0
              ? description
              : "프론트엔드 개발 이야기"
          }
        />
        <meta
          property="og:title"
          content={title ? `${title} | chanstory` : `chanstory`}
        />
        <meta
          property="og:image"
          content={thumbnailURL || "/images/thumbnail/default_thumbnail.png"}
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
          <ul className={styles.menu}>
            <li>
              <Link href={"/blog"}>
                <a className={activeMenu === "BLOG" ? styles.active : ""}>
                  blog
                </a>
              </Link>
            </li>
            <li>
              <Link href={"/gallery"}>
                <a className={activeMenu === "GALLERY" ? styles.active : ""}>
                  gallery
                </a>
              </Link>
            </li>
          </ul>
          {userLoading ? (
            <div className={styles.userWrap}>
              <Skeleton
                width={"35px"}
                height={"35px"}
                style={{ marginRight: 14, borderRadius: "100px" }}
              />
              <Skeleton width={"45px"} height={"24px"} />
            </div>
          ) : user ? (
            <Link href="/profile">
              <a className={styles.userWrap}>
                <img
                  src={formattingUserProfileURL(user?.profileURL, "avatar")}
                  className={styles.userProfileImage}
                />
                <div className={styles.userNickname}>{user!.nickname}</div>
              </a>
            </Link>
          ) : (
            <Link href={"/login"}>
              <div className={styles.userWrap}>
                <img
                  src="/images/user/default_profile.svg"
                  className={styles.userProfileImage}
                />
                <a className={styles.login}>로그인</a>
              </div>
            </Link>
          )}
        </div>
      </div>
      {children}
    </div>
  );
}
