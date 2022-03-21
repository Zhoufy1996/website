import {
  Button, Paper,
  Container, Grid, Typography, IconButton, Popover,
} from '@mui/material';
import { useSetRecoilState, useRecoilValue } from 'recoil';
import { useEffect } from 'react';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import {
  usePopupState,
  bindTrigger,
  bindPopover,
} from 'material-ui-popup-state/hooks';
import EditTemplateModal from '../../components/epic7/EditTemplateModal';
import { editTemplateModalVisibleState, personTemplatePresetArrayState, editTemplateIdState } from '../../store/epic7/template';
import { setLocalStorage } from '../../utils/localStorage';
import { PersonTemplatePreset } from '../../types/epic7';

interface TemplatePaperProps {
  template:PersonTemplatePreset;
  showDelete:boolean
}

const TemplatePaper = ({ template, showDelete }: TemplatePaperProps) => {
  const popupState = usePopupState({
    variant: 'popover',
    popupId: template.id,
  });
  const setEditTemplateId = useSetRecoilState(editTemplateIdState);
  const setEditTemplateModalVisible = useSetRecoilState(editTemplateModalVisibleState);
  const setPersonTemplatePrestArray = useSetRecoilState(personTemplatePresetArrayState);
  const handleEdit = (id: string) => {
    setEditTemplateId(id);
    setEditTemplateModalVisible(true);
  };
  const handleDelete = (id: string) => {
    setPersonTemplatePrestArray((pre) => {
      return pre.filter((item) => item.id !== id);
    });
  };

  return (
    <Paper
      sx={{
        p: 1,
      }}
    >
      <Grid
        container
        sx={{
          '& .MuiGrid-item': {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          },
        }}
      >
        <Grid
          item
          xs={4}
        >
          <Typography variant="h6">
            {template.name}
          </Typography>
        </Grid>
        <Grid item xs={5}>
          <Typography>{`攻击力: ${template.attack}`}</Typography>
          <Typography>{`防御力: ${template.defense}`}</Typography>
          <Typography>{`生命力: ${template.life}`}</Typography>
        </Grid>
        <Grid item xs={3}>

          <Button variant="text" size="small">使用</Button>
          <Button variant="text" size="small" onClick={() => handleEdit(template.id)}>编辑</Button>
          {
          showDelete && (
            <>
              <Button {...bindTrigger(popupState)} variant="text" size="small" color="error">删除</Button>
              <Popover
                {...bindPopover(popupState)}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'center',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'center',
                }}
              >
                <Button variant="text" size="large" color="error" onClick={() => handleDelete(template.id)}>确认删除</Button>
              </Popover>
            </>
          )
        }
        </Grid>
      </Grid>

    </Paper>
  );
};

const PersonTemplateModal = () => {
  const personTemplatePrestArray = useRecoilValue(personTemplatePresetArrayState);
  const setEditTemplateId = useSetRecoilState(editTemplateIdState);
  const setEditTemplateModalVisible = useSetRecoilState(editTemplateModalVisibleState);
  useEffect(() => {
    setLocalStorage('personTemplateList', JSON.stringify(personTemplatePrestArray));
  }, [personTemplatePrestArray]);
  const handleAdd = () => {
    setEditTemplateId('');
    setEditTemplateModalVisible(true);
  };
  return (

    <Container
      sx={{
        width: '100%',
        height: '100%',
        overflow: 'auto',
        p: 1,
      }}
    >
      <Grid container spacing={1}>
        {
              personTemplatePrestArray.map((template) => {
                return (
                  <Grid item key={template.id} xs={12}>
                    <TemplatePaper
                      template={template}
                      showDelete={personTemplatePrestArray.length > 1}
                    />
                  </Grid>
                );
              })
            }
      </Grid>

      <IconButton
        sx={{
          position: 'fixed', right: -10, top: -5, opacity: 0.2,
        }}
        onClick={handleAdd}
        color="primary"
        size="large"
      >
        <AddCircleOutlineIcon />
      </IconButton>
      <EditTemplateModal />
    </Container>
  );
};

export default PersonTemplateModal;
