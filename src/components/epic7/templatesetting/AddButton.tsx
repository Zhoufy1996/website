import {
  useTheme, useMediaQuery, Button, Fab,
} from '@mui/material';
import { useSetRecoilState } from 'recoil';
import AddIcon from '@mui/icons-material/Add';
import { v4 as uuidv4 } from 'uuid';
import { ReactEventHandler } from 'react';
import { editTemplateIdState } from '../../../store/epic7/template';

const AddButton = () => {
  const setEditTemplateId = useSetRecoilState(editTemplateIdState);
  const handleAdd:ReactEventHandler = (e) => {
    e.stopPropagation();
    setEditTemplateId(uuidv4());
  };
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('sm'));

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

    <Fab
      sx={{
        position: 'fixed', right: 5, bottom: 60, opacity: 0.5, zIndex: 50,
      }}
      onClick={handleAdd}
      color="primary"
      size="small"
    >
      <AddIcon />
    </Fab>
  );
};

export default AddButton;
