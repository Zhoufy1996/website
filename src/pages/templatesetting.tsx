import {
  Grid,
} from '@mui/material';
import { useRecoilValue } from 'recoil';

import EditTemplateModal from '../components/epic7/templatesetting/EditTemplateModal';
import { searchedTemplatesState, personTemplatePresetArrayState } from '../store/epic7/template';
import TemplatePaper from '../components/epic7/templatesetting/TemplatePaper';
import AddButton from '../components/epic7/templatesetting/ActionButton';

const TemplateSetting = () => {
  const searchedTemplates = useRecoilValue(searchedTemplatesState);
  const personTemplatePrestArray = useRecoilValue(personTemplatePresetArrayState);

  return (
    <>
      <AddButton />
      <Grid container spacing={1}>
        {
              searchedTemplates.map((template) => {
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

      <EditTemplateModal />
    </>
  );
};

export default TemplateSetting;
