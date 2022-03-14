import {
  Container, Box,
} from '@mui/material';
import { RecoilRoot } from 'recoil';
import Equipment from '../../components/epic7/Equipment';
import PersonTemplate from '../../components/epic7/PersonTemplate';

const Epic7Home = () => {
  return (
    <RecoilRoot>
      <Container>
        <Box
          sx={{
            '& .MuiTextField-root': { m: 1, width: '25ch' },
          }}
          component="form"
          noValidate
          autoComplete="off"
        >
          <PersonTemplate />
          <Equipment />
        </Box>
      </Container>
    </RecoilRoot>
  );
};

export default Epic7Home;
