import {
  Grid, Paper, styled,
} from '@mui/material';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';

const routes = [
  'qrcode',
  'esjdownloader',
  'code',
];

const GridContainer = styled(Grid)(({ theme }) => ({
  padding: theme.spacing(2),
}));

const Home: NextPage = () => {
  const router = useRouter();
  return (
    <GridContainer container spacing={3}>

      {
      routes.map((str) => (
        <Grid key={str} item>
          <Paper
            sx={{
              width: 200,
              height: 200,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
            }}
            onClick={() => {
              router.push(`/${str}`);
            }}
          >
            {str}
          </Paper>
        </Grid>
      ))
    }

    </GridContainer>
  );
};

export default Home;
