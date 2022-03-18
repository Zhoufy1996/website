import {
  Button, Modal, Paper,
  Box, Container, Grid, Card, CardContent, Typography, CardActions,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { PersonTemplate } from '../../types/epic7';
import { getLocalStorage, setLocalStorage } from '../../utils/localStorage';

const emptyPersonTemplate: PersonTemplateRow = {
  name: '',
  id: '',
  attack: '0',
  defense: '0',
  life: '0',
};

const initialPersonTemplate: PersonTemplateRow = {
  id: uuidv4(),
  name: '默认模板',
  attack: '1000',
  defense: '500',
  life: '5000',
};

const getInitialPersonTemplateList = (): PersonTemplateRow[] => {
  const localData = getLocalStorage('personTemplateList');
  if (localData) {
    return JSON.parse(localData);
  }

  return [initialPersonTemplate];
};

interface PersonTemplateRow extends PersonTemplate {
  name: string;
  id: string
}

const PersonTemplateModal = () => {
  const [open, setOpen] = useState<boolean>(true);
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  const [personTemplateList, setPersonTemplateList] = useState<
  PersonTemplateRow[]>(getInitialPersonTemplateList());

  const [editRow, setEditRow] = useState<PersonTemplateRow | null>(null);

  const changeEditRow = (key:keyof PersonTemplateRow, value:string) => {
    setEditRow((pre) => {
      if (pre == null) {
        return null;
      }
      return {
        ...pre,
        [key]: value,
      };
    });
  };

  useEffect(() => {
    setLocalStorage('personTemplateList', JSON.stringify(personTemplateList));
  }, [personTemplateList]);

  const handleAdd = () => {
    setPersonTemplateList((pre) => {
      return [
        ...pre,
        {
          ...emptyPersonTemplate,
          id: uuidv4(),
        },
      ];
    });
  };

  const handleDelete = (id: string) => {
    setPersonTemplateList((pre) => {
      return pre.filter((item) => item.id !== id);
    });
  };

  const handleSave = () => {
    if (editRow != null) {
      setPersonTemplateList((pre) => {
        return pre.map((item) => {
          if (item.id === editRow.id) {
            return editRow;
          }
          return item;
        });
      });
      setEditRow(null);
    }
  };

  const handleEdit = (template:PersonTemplateRow) => {
    setEditRow(template);
  };

  return (
    <>
      <Button onClick={handleOpen}>模板</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Container
          component={Paper}
          sx={{
            width: '100%',
            height: '100%',
            overflow: 'auto',
          }}
        >
          <Grid container spacing={1}>
            {
              personTemplateList.map((template) => {
                return (
                  <Grid item>
                    <Card>
                      <CardContent>
                        <Typography variant="h6">
                          {template.name}
                          <Button variant="text" size="small">使用</Button>
                        </Typography>

                        <Typography>{`攻击力: ${template.attack}`}</Typography>
                        <Typography>{`防御力: ${template.defense}`}</Typography>
                        <Typography>{`生命力: ${template.life}`}</Typography>
                      </CardContent>
                      <CardActions>
                        <Button variant="text" size="small" onClick={() => handleEdit(template)}>编辑</Button>
                        <Button variant="text" size="small" color="error" onClick={() => handleDelete(template.id)}>删除</Button>

                      </CardActions>
                    </Card>
                  </Grid>
                );
              })
            }
          </Grid>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Button onClick={handleAdd}>
              新增
            </Button>
          </Box>
        </Container>

      </Modal>
    </>

  );
};

export default PersonTemplateModal;
