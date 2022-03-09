import {
  Grid,
} from '@mui/material';
import { FullPaper } from '../components/article';
import ApplyView from '../components/js/Apply';
import BindView from '../components/js/Bind';
import CallView from '../components/js/Call';
import DeepClone from '../components/js/DeepClone';
import PageContainer from '../components/pagecontainer';

const Components = [
  DeepClone, CallView, ApplyView, BindView,
];

const JSPage = () => {
  return (
    <PageContainer>
      <Grid container spacing={2}>
        {
          Components.map((Component) => {
            return (
              <Grid item xs={6} key={Component.name}>
                <FullPaper>
                  <Component />
                </FullPaper>
              </Grid>
            );
          })
        }

      </Grid>

    </PageContainer>
  );
};

export default JSPage;
