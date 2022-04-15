import React from "react";
import Link from "next/link";
import Head from "next/head";
import styles from "@styles/Layout.module.css";

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
}

export default function Layout({ title, children }: LayoutProps) {
  return (
    <div>
      <Head>
        <title>{title ? `${title} - chanstory` : `chanstory`}</title>
      </Head>
      <div className={styles.header}>
        <div className={styles.logo}>Chanstory</div>
        <div>Login</div>
      </div>
      {children}
    </div>
  );
}
