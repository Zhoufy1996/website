import { useRecoilState, useRecoilValue } from 'recoil';
import Typography from '@mui/material/Typography';
import { Box, Button, Chip, Menu, MenuItem, Stack } from '@mui/material';
import { usePopupState, bindTrigger, bindPopover } from 'material-ui-popup-state/hooks';
import { publishedTemplateState, selectedTemplateIdState, selectedTemplateState } from '../../../store/epic7/template';

const PersonTemplate = () => {
  const personTemplates = useRecoilValue(publishedTemplateState);
  const [selectedTemplateId, setSelectedTemplateId] = useRecoilState(selectedTemplateIdState);

  const popupState = usePopupState({
    variant: 'popover',
    popupId: 'template-select',
  });

  const selectedTemplate = useRecoilValue(selectedTemplateState);

  return (
    <Box>
      <Typography component="span" variant="h6">
        人物面板
      </Typography>
      <Button {...bindTrigger(popupState)}>{(selectedTemplate && selectedTemplate.name) || ''}</Button>
      <Stack direction="row" spacing={1}>
        <Chip color="success" variant="outlined" label={`攻: ${selectedTemplate ? selectedTemplate.attack : ''}`} />
        <Chip color="secondary" variant="outlined" label={`防: ${selectedTemplate ? selectedTemplate.defense : ''}`} />
        <Chip color="error" variant="outlined" label={`生: ${selectedTemplate ? selectedTemplate.life : ''}`} />
      </Stack>
      <Menu {...bindPopover(popupState)}>
        {personTemplates.map((template) => {
          return (
            <MenuItem
              selected={template.id === selectedTemplateId}
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
  );
};

export default PersonTemplate;
