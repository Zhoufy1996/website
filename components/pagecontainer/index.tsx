import { Container, styled } from '@mui/material';

const PageContainer = styled(Container)(({ theme }) => ({
  padding: theme.spacing(3),
  minWidth: 1200,
}));

export default PageContainer;
