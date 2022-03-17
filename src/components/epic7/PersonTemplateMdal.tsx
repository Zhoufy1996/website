import { Button, Modal, Box } from '@mui/material';
import { useEffect, useState } from 'react';
import { PersonTemplate } from '../../types/epic7';

const getInitialPersonTemplateList = () => {
  const localData = localStorage && localStorage.getItem('personTemplateList');
  if (localData) {
    return JSON.parse(localData);
  }

  return [];
};

const PersonTemplateModal = () => {
  const [open, setOpen] = useState<boolean>(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  const [personTemplateList, setPersonTemplateList] = useState<(PersonTemplate
  & { name:string })[]>(getInitialPersonTemplateList());

  useEffect(() => {
    if (localStorage) {
      localStorage.setItem('personTemplateList', JSON.stringify(personTemplateList));
    }
  }, [personTemplateList]);

  return (
    <>
      <Button onClick={handleOpen}>模板</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >

        <Box>
          123
        </Box>
      </Modal>
    </>

  );
};

export default PersonTemplateModal;
