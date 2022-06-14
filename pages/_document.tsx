import Document, { Head, Html, Main, NextScript } from "next/document";
import Script from "next/script";

class CustomDocument extends Document {
  render(): JSX.Element {
    return (
      <Html lang="ko">
        <Head>
          <Script
            async
            src={`https://www.googletagmanager.com/gtag/js?${process.env.GOOGLE_ANALYTICS_ID}`}
          ></Script>
          <Script
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.GOOGLE_ANALYTICS_ID}');
          `,
            }}
          />
          <meta name="description" content="프론트엔드 개발 이야기" />
          <meta property="og:type" content="blog" />
          <meta
            name="google-site-verification"
            content="omwGBkhkv9uHj7JnqbzzlTMMX4Onp_jHpTqqE72E9qo"
          />
          <link
            href="https://hangeul.pstatic.net/hangeul_static/css/nanum-barun-gothic.css"
            rel="stylesheet"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100;300;400;500;700;900&display=swap"
            rel="stylesheet"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default CustomDocument;
