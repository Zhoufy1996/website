import { ThemeProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';
import Head from 'next/head';
import theme from '../../utils/theme';
import Epic7Home from './home';

const Epic7ToolsHome = () => {
  return (
    <>
      <Head>
        <title>Epic7 Tools</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Epic7Home />
      </ThemeProvider>
    </>
  );
};

export default Epic7ToolsHome;
