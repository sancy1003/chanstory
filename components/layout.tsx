import React from 'react';
import Link from 'next/link';
import Head from 'next/head';
import styles from '@styles/Layout.module.css';
import 'react-loading-skeleton/dist/skeleton.css';
import Image from 'next/image';
import Footer from './common/footer';

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
  thumbnailURL?: string | null;
  keywords?: string | null;
  url?: string;
  description?: string;
  activeMenu: 'BLOG' | 'GALLERY' | 'NONE';
}

export default function Layout({
  title,
  children,
  thumbnailURL,
  keywords,
  url,
  activeMenu,
  description,
}: LayoutProps) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
      }}
    >
      <Head>
        <title>{title ? `${title} | chanstory` : `chanstory`}</title>
        <meta
          property="description"
          content={
            description && description.length > 0
              ? description
              : '프론트엔드 개발 이야기'
          }
        />
        <meta
          property="og:title"
          content={title ? `${title} | chanstory` : `chanstory`}
        />
        <meta
          property="og:image"
          content={thumbnailURL || '/images/thumbnail/default_thumbnail.png'}
        />
        {url && (
          <meta property="og:url" content={`https://www.chanstory.dev${url}`} />
        )}
        {keywords && <meta name="keywords" content={keywords} />}
      </Head>
      <div className={styles.header}>
        <div className={styles.headerWrap}>
          <Link href={'/'} className={styles.logo}>
            <Image
              src="/images/logo/logo.svg"
              fill
              alt="logo"
              priority={true}
            />
          </Link>
          <ul className={styles.menu}>
            <li>
              <Link
                href={'/blog'}
                className={activeMenu === 'BLOG' ? styles.active : ''}
              >
                blog
              </Link>
            </li>
            <li>
              <Link
                href={'/gallery'}
                className={activeMenu === 'GALLERY' ? styles.active : ''}
              >
                gallery
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div style={{ flex: 1, paddingTop: 50 }}>{children}</div>
      <Footer />
    </div>
  );
}
