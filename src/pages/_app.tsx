import {
  Box, BottomNavigation, BottomNavigationAction, Paper, CssBaseline,
} from '@mui/material';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { RecoilRoot } from 'recoil';
import { ThemeProvider } from '@emotion/react';
import theme from '../utils/theme';
import SyncTemplate from '../components/epic7/SyncTemplate';

// https://stackoverflow.com/questions/61024356/how-to-use-theme-in-material-ui-with-react-next-js
function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>Epic7 Tools</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <RecoilRoot>
          <Box sx={{ width: '100%', paddingBottom: '40px' }}>
            <Component {...pageProps} />
            <SyncTemplate />
            <Paper
              sx={{
                position: 'fixed', bottom: 0, left: 0, right: 0,
              }}
              elevation={3}
            >
              <BottomNavigation
                showLabels
                value={router.pathname}
                onChange={(event, newValue) => {
                  router.push(newValue);
                }}
                sx={{
                  height: 36,
                }}
              >
                <BottomNavigationAction value="/equipmentenhance" label="装备强化" />
                <BottomNavigationAction value="/templatesetting" label="人物模板" />
              </BottomNavigation>
            </Paper>

          </Box>
        </RecoilRoot>
      </ThemeProvider>
    </>
  );
}

export default MyApp;
