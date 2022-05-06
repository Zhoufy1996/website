import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import Typography from '@mui/material/Typography';
import { Box, Button, Menu, MenuItem } from '@mui/material';
import { usePopupState, bindTrigger, bindPopover } from 'material-ui-popup-state/hooks';
import { personTemplateState, selectedTemplateIdState } from '../../../store/epic7/equipment';
import { PersonAttributeCode } from '../../../types/epic7';
import { personPropertyOptions } from '../../../data/epic7';
import { personTemplatePresetArrayState } from '../../../store/epic7/template';
import CustomTextField from '../../biz/CustomTextFiled';

const PersonTemplate = () => {
  const personTemplate = useRecoilValue(personTemplateState);
  const [personTemplateArray, setPersonTemplateArray] = useRecoilState(personTemplatePresetArrayState);

  const setSelectedTemplateId = useSetRecoilState(selectedTemplateIdState);

  const popupState = usePopupState({
    variant: 'popover',
    popupId: 'template-select',
  });

  const setPersonTemplate = (code: PersonAttributeCode, value: string) => {
    setPersonTemplateArray((pre) => {
      return pre.map((item) => {
        if (item.id === personTemplate?.id) {
          return {
            ...item,
            [code]: value,
          };
        }
        return item;
      });
    });
  };
  return (
    <div>
      <Box>
        <Typography component="span" variant="h6">
          人物面板
        </Typography>
        <Button {...bindTrigger(popupState)}>{(personTemplate && personTemplate.name) || ''}</Button>
        <Menu {...bindPopover(popupState)}>
          {personTemplateArray.map((template) => {
            return (
              <MenuItem
                selected={template.id === (personTemplate && personTemplate.id)}
                key={template.id}
                onClick={() => {
                  setSelectedTemplateId(template.id);
                  popupState.close();
                }}
              >
                {template.name}
              </MenuItem>
            );
          })}
        </Menu>
      </Box>
      {personTemplate &&
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
                setPersonTemplate(code as PersonAttributeCode, e.target.value);
              }}
            />
          );
        })}
    </div>
  );
};

export default PersonTemplate;
