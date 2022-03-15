import {
  Container, Box, Divider,
} from '@mui/material';
import { RecoilRoot } from 'recoil';
import CalcScore from '../../components/epic7/CalcScore';
import Equipment from '../../components/epic7/Equipment';
import PersonTemplate from '../../components/epic7/PersonTemplate';
import SimulateEnhance from '../../components/epic7/SimulateEnhance';

const Epic7Home = () => {
  return (
    <RecoilRoot>
      <Container
        sx={(theme) => {
          return {
            paddingLeft: theme.spacing(1),
            paddingRight: theme.spacing(1),
          };
        }}
      >
        <Box
          sx={(theme) => {
            return {
              '& .MuiTextField-root': {
                marginTop: theme.spacing(1),
                marginLeft: theme.spacing(0.4),
                width: 110,
              },
              '& .MuiDivider-root': {
                m: 1,
              },
            };
          }}
          component="form"
          noValidate
          autoComplete="off"
        >
          <PersonTemplate />
          <Divider />
          <Equipment />
          <Divider />
          <CalcScore />
          <Divider />
          <SimulateEnhance />
        </Box>
      </Container>
    </RecoilRoot>
  );
};

export default Epic7Home;
