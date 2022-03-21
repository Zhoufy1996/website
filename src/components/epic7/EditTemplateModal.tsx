import {
  Container, Card, CardContent, TextField, CardActions, Button, Modal,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import {
  getInitialPersonTemplate, personTemplatePresetArrayState,
  editTemplateIdState, editTemplateModalVisibleState,
} from '../../store/epic7/template';
import { PersonTemplatePreset } from '../../types/epic7';

const EditTemplateModal = () => {
  const personTemplatePrestArray = useRecoilValue(personTemplatePresetArrayState);
  const setPersonTemplatePrestArray = useSetRecoilState(personTemplatePresetArrayState);
  const editTemplateModalVisible = useRecoilValue(editTemplateModalVisibleState);
  const setEditTemplateModalVisible = useSetRecoilState(editTemplateModalVisibleState);

  const editTemplateId = useRecoilValue(editTemplateIdState);

  const [editTemplate, setEditTemplate] = useState<
  PersonTemplatePreset>(getInitialPersonTemplate());
  useEffect(() => {
    setEditTemplate(personTemplatePrestArray.find((item) => item.id === editTemplateId)
    || getInitialPersonTemplate());
  }, [editTemplateId, personTemplatePrestArray]);

  const handleCancel = () => {
    setEditTemplateModalVisible(false);
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

  return (
    <Modal
      open={editTemplateModalVisible}
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
            <Button variant="text" size="small" onClick={handleSave}>保存</Button>
            <Button variant="text" size="small" color="error" onClick={handleCancel}>取消</Button>
          </CardActions>
        </Card>

      </Container>
    </Modal>

  );
};

export default EditTemplateModal;
