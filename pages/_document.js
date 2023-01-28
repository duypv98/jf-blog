import NextDocument, { Head, Html, Main, NextScript } from "next/document";

class Document extends NextDocument {
  render() {
    return <Html>
      <Head>
        <script type="text/javascript"
          id="MathJax-script"
          async
          src="https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.7/MathJax.js?config=TeX-MML-AM_CHTML"
        />
      </Head>

      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  }

  /**
   *
   * @param {import("next/document").DocumentContext} ctx
   */
  static async getInitialProps(ctx) {
    const originalRenderPage = ctx.renderPage;
    ctx.renderPage = () => originalRenderPage({
      enhanceApp: (App) => (props) => <App {...props} />
    });

    const initialProps = await NextDocument.getInitialProps(ctx);
    return {
      ...initialProps
    }
  }
}

export default Document;