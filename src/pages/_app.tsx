import {
  Box, BottomNavigation, BottomNavigationAction, Paper,
} from '@mui/material';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { RecoilRoot } from 'recoil';

// https://stackoverflow.com/questions/61024356/how-to-use-theme-in-material-ui-with-react-next-js
function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  console.log(router.pathname);
  return (
    <RecoilRoot>
      <Box sx={{ width: '100%', pb: 7 }}>
        <Component {...pageProps} />
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
          >
            <BottomNavigationAction value="/epic7/home" label="装备强化" />
            <BottomNavigationAction value="/epic7/templatesetting" label="任务面板" />
          </BottomNavigation>
        </Paper>

      </Box>
    </RecoilRoot>
  );
}

export default MyApp;
