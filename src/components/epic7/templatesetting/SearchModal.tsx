import { useRecoilState } from 'recoil';
import {
  Box, Card, CardContent, CardActions, Button, Modal,
} from '@mui/material';
import { useEffect, useState } from 'react';
import {
  searchedTextState,
} from '../../../store/epic7/template';
import CustomTextField from '../../biz/CustomTextFiled';

interface SearchModalProps {
  open: boolean;
  handleClose: () => void
}

const SearchModal = ({ open, handleClose }: SearchModalProps) => {
  const [searchedText, setSearchedText] = useRecoilState(searchedTextState);

  const [text, setText] = useState('');
  useEffect(() => {
    setText(searchedText);
  }, [searchedText]);

  const handleSave = () => {
    setSearchedText(text);
    handleClose();
  };

  useEffect(() => {
    if (open) {
      setText(searchedText);
    }
  }, [open, searchedText]);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"

    >
      <Box
        sx={{
          top: '10%',
          position: 'absolute',
          left: '50%',
          transform: 'translate(-50%, 0)',
          width: '80%',
          maxWidth: 500,
        }}
      >

        <Card>
          <CardContent
            sx={(theme) => {
              return {
                '& .MuiTextField-root': {
                  margin: 'auto',
                  marginTop: theme.spacing(1),
                },
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              };
            }}
          >
            <CustomTextField
              type="text"
              value={text}
              label="搜索文字"
              onChange={(e) => {
                setText(e.target.value);
              }}
            />

          </CardContent>
          <CardActions
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Button variant="text" size="small" color="error" onClick={handleClose}>取消</Button>
            <Button variant="text" size="small" onClick={handleSave}>搜索</Button>
          </CardActions>
        </Card>

      </Box>
    </Modal>
  );
};

export default SearchModal;
