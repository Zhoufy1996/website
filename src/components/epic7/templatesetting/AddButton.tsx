import {
  IconButton, useTheme, useMediaQuery, Button,
} from '@mui/material';
import { useSetRecoilState } from 'recoil';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { v4 as uuidv4 } from 'uuid';
import { editTemplateIdState } from '../../../store/epic7/template';

const AddButton = () => {
  const setEditTemplateId = useSetRecoilState(editTemplateIdState);
  const handleAdd = () => {
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

    <IconButton
      sx={{
        position: 'fixed', right: 0, top: -5, opacity: 0.2,
      }}
      onClick={handleAdd}
      color="primary"
      size="large"
    >
      <AddCircleOutlineIcon />
    </IconButton>
  );
};

export default AddButton;
