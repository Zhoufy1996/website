import {
  useTheme, useMediaQuery, Button, SpeedDial, SpeedDialAction,
} from '@mui/material';
import { useSetRecoilState } from 'recoil';
import AddIcon from '@mui/icons-material/Add';
import { v4 as uuidv4 } from 'uuid';
import { ReactEventHandler, useState } from 'react';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SearchIcon from '@mui/icons-material/Search';

import { editTemplateIdState } from '../../../store/epic7/template';
import SearchModal from './SearchModal';

const AddButton = () => {
  const setEditTemplateId = useSetRecoilState(editTemplateIdState);
  const handleAdd:ReactEventHandler = (e) => {
    e.stopPropagation();
    setEditTemplateId(uuidv4());
  };
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('sm'));

  const [open, setOpen] = useState<boolean>(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return matches ? (
    <Button
      variant="contained"
      color="primary"
      onClick={handleAdd}
      sx={{ ml: 2 }}
    >
      新增
    </Button>
  ) : (
    <>
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
        <SpeedDialAction key="add" icon={<AddIcon />} tooltipTitle="添加" onClick={handleAdd} />
        <SpeedDialAction key="search" icon={<SearchIcon />} tooltipTitle="搜索" onClick={handleOpen} />
      </SpeedDial>
      <SearchModal open={open} handleClose={handleClose} />
    </>
  );
};

export default AddButton;
