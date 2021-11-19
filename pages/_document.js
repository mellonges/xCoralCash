import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link rel="icon" type="image/png" sizes="32x32" href="favicon/xcoral_icon_500px.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="favicon/xcoral_icon_100px.png" />
          <link rel="apple-touch-icon" sizes="180x180" href="favicon/xcoral_icon_500px.png" />
          <link rel="manifest" href="site.webmanifest" />
          <link rel="mask-icon" href="safari-pinned-tab.svg" color="003d56" />
          <meta name="theme-color" content="aqua" />
          <script type="text/javascript" src="scripts/tawkio.js"></script>
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
