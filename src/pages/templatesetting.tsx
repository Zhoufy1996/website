import {
  Container, Grid, IconButton,
} from '@mui/material';
import { useSetRecoilState, useRecoilValue } from 'recoil';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

import { v4 as uuidv4 } from 'uuid';
import EditTemplateModal from '../components/epic7/templatesetting/EditTemplateModal';
import { personTemplatePresetArrayState, editTemplateIdState } from '../store/epic7/template';
import TemplatePaper from '../components/epic7/templatesetting/TemplatePaper';

const TemplateSetting = () => {
  const personTemplatePrestArray = useRecoilValue(personTemplatePresetArrayState);
  const setEditTemplateId = useSetRecoilState(editTemplateIdState);

  const handleAdd = () => {
    setEditTemplateId(uuidv4());
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

export default TemplateSetting;
