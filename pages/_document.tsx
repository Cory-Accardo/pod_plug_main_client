import Document, { Html, Head, Main, NextScript } from "next/document";

export default class MyDocument extends Document {
  static async getInitialProps(ctx: never): Promise<{
    html: string;
    head?: JSX.Element[];
    styles?:
      | React.ReactElement<
          unknown,
          string | React.JSXElementConstructor<unknown>
        >[]
      | React.ReactFragment;
  }> {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render(): JSX.Element {
    return (
      <Html lang="en">
        <Head></Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
