import Document, {
  DocumentContext,
  Head,
  Html,
  Main,
  NextScript,
} from 'next/document';
import { ServerStyleSheet } from 'styled-components';

export default class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props: any) =>
            sheet.collectStyles(<App {...props} />),
        });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }

  render() {
    return (
      <Html lang="ko">
        <Head>
          <link
            rel="preload"
            href="/fonts/TossFaceFontMac.ttf"
            as="font"
            crossOrigin="anonymous"
            type="font/ttf"
          />
          <link
            href="https://hangeul.pstatic.net/hangeul_static/css/nanum-barun-gothic.css"
            rel="stylesheet"
          />
          {/* 애드센스 */}
          {/* <script
            async
            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3131973401944410"
            crossOrigin="anonymous"
          ></script>
          <script
            async
            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3131973401944410"
            crossOrigin="anonymous"
          ></script> */}
          {/* 애드센스 */}
          <script
            async
            src={`https://www.googletagmanager.com/gtag/js?${process.env.GOOGLE_ANALYTICS_ID}`}
          ></script>
          <script
            dangerouslySetInnerHTML={{
              __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.GOOGLE_ANALYTICS_ID}');
          `,
            }}
          />
          <meta property="og:type" content="blog" />
          <meta
            name="google-site-verification"
            content="omwGBkhkv9uHj7JnqbzzlTMMX4Onp_jHpTqqE72E9qo"
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
