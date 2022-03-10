import { ThemeProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';
import Head from 'next/head';
import theme from '../../utils/theme';

const Epic7ToolsHome = () => {
  return (
    <>
      <Head>
        <title>Epic7 Tools</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
      </ThemeProvider>
    </>
  );
};

export default Epic7ToolsHome;
