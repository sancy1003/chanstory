import React from 'react';
import Head from 'next/head';
import 'react-loading-skeleton/dist/skeleton.css';
import Footer from './common/footer';
import * as S from '@styles/components/common/layout.style';
import Header from './common/header';

interface Props {
  children: React.ReactNode;
  title?: string;
  thumbnailURL?: string | null;
  keywords?: string | null;
  url?: string;
  description?: string;
  activeMenu: 'BLOG' | 'GALLERY' | 'NONE';
}

const Layout = ({
  title,
  children,
  thumbnailURL,
  keywords,
  url,
  activeMenu,
  description,
}: Props) => {
  return (
    <S.LayoutContainer>
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
      <Header activeMenu={activeMenu} />
      <S.LayoutContent>{children}</S.LayoutContent>
      <Footer />
    </S.LayoutContainer>
  );
};

export default Layout;
