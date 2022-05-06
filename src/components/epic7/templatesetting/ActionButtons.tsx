import { useTheme, Button, SpeedDial, SpeedDialAction, useMediaQuery } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';

interface ActionButtonProps {
  onAdd: () => void;
}

const ActionButtons = ({ onAdd }: ActionButtonProps) => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('sm'));

  return matches ? (
    <Button variant="contained" color="primary" onClick={onAdd} sx={{ ml: 2 }}>
      新增
    </Button>
  ) : (
    <SpeedDial
      sx={{
        position: 'fixed',
        right: 5,
        bottom: 60,
        zIndex: 50,
        '& .MuiSpeedDial-fab': {
          width: 50,
          height: 50,
        },
        '& .MuiSpeedDial-actions': {
          paddingBottom: 4,
        },
      }}
      color="primary"
      ariaLabel="SpeedDial"
      icon={<SpeedDialIcon />}
    >
      <SpeedDialAction key="add" icon={<AddIcon />} tooltipTitle="添加" onClick={onAdd} />
    </SpeedDial>
  );
};

export default ActionButtons;
