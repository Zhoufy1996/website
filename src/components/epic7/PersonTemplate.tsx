import { useRecoilValue, useSetRecoilState } from 'recoil';
import Typography from '@mui/material/Typography';
import { personTemplateState } from '../../store/epic7/equipment';
import { PersonAttributeCode } from '../../types/epic7';
import { personPropertyOptions } from '../../data/epic7';
import CustomTextField from './CustomTextField';

const PersonTemplate = () => {
  const personTemplate = useRecoilValue(personTemplateState);
  const setPersonTemplate = useSetRecoilState(personTemplateState);

  return (
    <div>
      <Typography variant="h6">人物面板</Typography>
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
