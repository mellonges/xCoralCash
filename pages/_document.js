import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link rel="icon" type="image/png" sizes="32x32" href="/favicon/xcoral_icon_100px.ico" />
          <link rel="icon" type="image/png" sizes="16x16" href="/favicon/xcoral_icon_100px.png" />
          <link rel="apple-touch-icon" sizes="180x180" href="/favicon/xcoral_icon_500px.png" />
          <link rel="mask-icon" href="safari-pinned-tab.svg" color="45ffde" />
          <meta name="theme-color" content="45ffde" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
