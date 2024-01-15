import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang='en'>
      <Head />
      <body
        className="bg-gradient-to-r
      from-cyan-50
      via-teal-100
      to-teal-300"
      >
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}