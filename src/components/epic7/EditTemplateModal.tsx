import {
  Container, Card, CardContent, TextField, CardActions, Button, Modal,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import {
  personTemplatePresetArrayState,
  editTemplateIdState,
} from '../../store/epic7/template';
import { PersonTemplatePreset } from '../../types/epic7';
import { getInitialPersonTemplate } from '../../utils/epic7';

const EditTemplateModal = () => {
  const [personTemplatePrestArray, setPersonTemplatePrestArray] = useRecoilState(
    personTemplatePresetArrayState,
  );

  const [editTemplateId, setEditTemplateId] = useRecoilState(editTemplateIdState);

  const [editTemplate, setEditTemplate] = useState<
  PersonTemplatePreset>(getInitialPersonTemplate());

  useEffect(() => {
    setEditTemplate(personTemplatePrestArray.find((item) => item.id === editTemplateId)
    || getInitialPersonTemplate());
  }, [editTemplateId, personTemplatePrestArray]);

  const handleCancel = () => {
    setEditTemplateId('');
  };

  const handleSave = () => {
    if (personTemplatePrestArray.find((item) => item.id === editTemplate.id)) {
      setPersonTemplatePrestArray((pre) => {
        return pre.map((item) => {
          if (item.id === editTemplate.id) {
            return {
              ...editTemplate,
            };
          }

          return item;
        });
      });
    } else {
      setPersonTemplatePrestArray((pre) => {
        return [
          ...pre,
          editTemplate,
        ];
      });
    }
    handleCancel();
  };

  const open = editTemplateId !== '';

  return (
    <Modal
      open={open}
      onClose={handleCancel}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"

    >
      <Container
        sx={{
          top: '10%',
          position: 'absolute',
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
            <TextField
              type="text"
              value={editTemplate.name}
              label="名称"
              onChange={(e) => {
                setEditTemplate((pre) => {
                  return {
                    ...pre,
                    name: e.target.value,
                  };
                });
              }}
            />

            <TextField
              type="number"
              value={editTemplate.attack}
              label="攻击力"
              onChange={(e) => {
                setEditTemplate((pre) => {
                  return {
                    ...pre,
                    attack: e.target.value,
                  };
                });
              }}
            />

            <TextField
              type="number"
              value={editTemplate.defense}
              label="防御力"
              onChange={(e) => {
                setEditTemplate((pre) => {
                  return {
                    ...pre,
                    defense: e.target.value,
                  };
                });
              }}
            />

            <TextField
              type="number"
              value={editTemplate.life}
              label="生命力"
              onChange={(e) => {
                setEditTemplate((pre) => {
                  return {
                    ...pre,
                    life: e.target.value,
                  };
                });
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
            <Button variant="text" size="small" color="error" onClick={handleCancel}>取消</Button>
            <Button variant="text" size="small" onClick={handleSave}>保存</Button>
          </CardActions>
        </Card>

      </Container>
    </Modal>

  );
};

export default EditTemplateModal;
