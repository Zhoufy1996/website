import { usePopupState, bindTrigger, bindPopover } from 'material-ui-popup-state/hooks';
import { Button, Paper, Grid, Typography, Popover } from '@mui/material';
import SelectButton from './SelectButton';
import { PersonTemplate } from '../../../types/epic7';

interface TemplatePaperProps {
  template: PersonTemplate;
  showDelete: boolean;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

const TemplatePaper = ({ template, showDelete, onEdit, onDelete }: TemplatePaperProps) => {
  const popupState = usePopupState({
    variant: 'popover',
    popupId: template.id,
  });

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
        <Grid item xs={4}>
          <Typography variant="h6">{template.name}</Typography>
        </Grid>
        <Grid item xs={5}>
          <Typography>{`攻击力: ${template.attack}`}</Typography>
          <Typography>{`防御力: ${template.defense}`}</Typography>
          <Typography>{`生命力: ${template.life}`}</Typography>
        </Grid>
        <Grid item xs={3}>
          <SelectButton templateId={template.id} />
          <Button variant="text" size="small" onClick={() => onEdit(template.id)}>
            编辑
          </Button>
          {showDelete && (
            <>
              <Button {...bindTrigger(popupState)} variant="text" size="small" color="error">
                删除
              </Button>
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
                <Button variant="text" size="large" color="error" onClick={() => onDelete(template.id)}>
                  确认删除
                </Button>
              </Popover>
            </>
          )}
        </Grid>
      </Grid>
    </Paper>
  );
};
export default TemplatePaper;
