import { useRecoilValue, useSetRecoilState } from 'recoil';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';
import { personTemplateState } from '../../store/epic7/equipment';
import { PersonAttributeCode } from '../../types/epic7';
import { personPropertyOptions } from '../../data/epic7';
import CustomTextField from './CustomTextField';
// import PersonTemplateModal from './PersonTemplateMdal';

const PersonTemplate = () => {
  const personTemplate = useRecoilValue(personTemplateState);
  const setPersonTemplate = useSetRecoilState(personTemplateState);

  return (
    <div>
      <Box>
        <Typography component="span" variant="h6">人物面板</Typography>
        {/* <PersonTemplateModal /> */}
      </Box>

      {
          Object.entries(personPropertyOptions).map(([code, options]) => {
            return (
              <CustomTextField
                key={code}
                id={code}
                label={options.label}
                type="number"
                variant="outlined"
                value={personTemplate[code as PersonAttributeCode]}
                inputProps={{
                  min: 0,
                }}
                onChange={(e) => {
                  setPersonTemplate((pre) => {
                    return {
                      ...pre,
                      [code]: e.target.value,
                    };
                  });
                }}
              />
            );
          })
      }
    </div>
  );
};

export default PersonTemplate;
