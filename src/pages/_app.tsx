import type { AppProps } from 'next/app';

// https://stackoverflow.com/questions/61024356/how-to-use-theme-in-material-ui-with-react-next-js
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Component {...pageProps} />
  );
}

export default MyApp;
