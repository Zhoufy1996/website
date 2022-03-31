import {
  CssBaseline,
} from '@mui/material';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { RecoilRoot } from 'recoil';
import { ThemeProvider } from '@emotion/react';
import theme from '../utils/theme';
import RecoilEffects from '../components/epic7/RecoilEffects';
import RootContainer from '../components/biz/RootContainer';

// https://stackoverflow.com/questions/61024356/how-to-use-theme-in-material-ui-with-react-next-js
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Epic7 Tools</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
        <link rel="manifest" href="/manifest.json" />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <RecoilRoot>
          <RootContainer>
            <Component {...pageProps} />
            <RecoilEffects />
          </RootContainer>
        </RecoilRoot>
      </ThemeProvider>
    </>
  );
}

export default MyApp;
