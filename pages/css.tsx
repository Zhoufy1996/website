import {
  Paper,
} from '@mui/material';
import BoxModel from '../components/css/BoxModel';
import PageContainer from '../components/pagecontainer';

const CSSPage = () => {
  return (
    <PageContainer>

      <Paper sx={{ maxWidth: 400, minHeight: 200 }}>
        <BoxModel />
      </Paper>
    </PageContainer>
  );
};

export default CSSPage;
