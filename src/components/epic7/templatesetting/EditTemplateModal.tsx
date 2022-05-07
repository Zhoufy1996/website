import { Box, Card, CardContent, CardActions, Button, Modal } from '@mui/material';
import { useCallback, useState } from 'react';
import { PersonTemplate } from '../../../types/epic7';
import CustomTextField from '../../biz/CustomTextFiled';

interface EditTemplateModalProps {
  defaultTemplate: PersonTemplate;
  onOk: (value: PersonTemplate) => void;
  onClose: () => void;
}

const EditTemplateModal = ({ defaultTemplate, onOk, onClose }: EditTemplateModalProps) => {
  const [template, setTemplate] = useState<PersonTemplate>(defaultTemplate);

  const changeTemplate = useCallback((value: Partial<PersonTemplate>) => {
    setTemplate((pre) => {
      return {
        ...pre,
        ...value,
      };
    });
  }, []);

  return (
    <Modal open onClose={onClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
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
              value={template.name}
              label="名称"
              onChange={(e) => {
                console.log(e.target.value);
                changeTemplate({
                  name: e.target.value,
                });
              }}
            />

            <CustomTextField
              type="number"
              value={template.attack}
              label="攻击力"
              onChange={(e) => {
                changeTemplate({
                  attack: e.target.value,
                });
              }}
            />

            <CustomTextField
              type="number"
              value={template.defense}
              label="防御力"
              onChange={(e) => {
                changeTemplate({
                  defense: e.target.value,
                });
              }}
            />

            <CustomTextField
              type="number"
              value={template.life}
              label="生命力"
              onChange={(e) => {
                changeTemplate({
                  life: e.target.value,
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
            <Button variant="text" size="small" color="error" onClick={onClose}>
              取消
            </Button>
            <Button variant="text" size="small" onClick={() => onOk(template)}>
              保存
            </Button>
          </CardActions>
        </Card>
      </Box>
    </Modal>
  );
};

export default EditTemplateModal;
