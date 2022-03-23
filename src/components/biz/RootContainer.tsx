import { Container } from '@mui/material';
import Navigation from './Navigation';

const RootContainer = ({ children }: { children:React.ReactNode }) => {
  return (
    <Container
      sx={(theme) => ({
        p: 1,
        paddingBottom: '70px',
        [theme.breakpoints.up('sm')]: {
          paddingBottom: '40px',
        },
      })}
    >
      <Navigation />
      {children}
    </Container>
  );
};

export default RootContainer;
