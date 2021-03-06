import { Box, Divider } from '@mui/material';
import CalcScore from '../components/epic7/equipmentenhance/CalcScore';
import Equipment from '../components/epic7/equipmentenhance/Equipment';
import PersonTemplate from '../components/epic7/equipmentenhance/PersonTemplate';
import SimulateEnhance from '../components/epic7/equipmentenhance/SimulateEnhance';

const EquipmentEnhance = () => {
  return (
    <Box
      sx={(theme) => {
        return {
          '& .MuiTextField-root': {
            marginTop: theme.spacing(1),
            marginLeft: theme.spacing(0.4),
            width: 110,
            [theme.breakpoints.up('sm')]: {
              width: 180,
            },
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
  );
};

export default EquipmentEnhance;
