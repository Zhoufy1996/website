import { Button, Typography } from '@mui/material';
import { useRecoilState } from 'recoil';
import { selectedTemplateIdState } from '../../../store/epic7/equipment';

const SelectButton = ({ templateId }: { templateId: string }) => {
  const [selectedTemplateId, setSelectedTemplateId] = useRecoilState(selectedTemplateIdState);

  const isSelected = selectedTemplateId === templateId;

  const handleSelect = () => {
    setSelectedTemplateId(templateId);
  };

  return isSelected ? (
    <Typography fontSize={12} textAlign="center" variant="error">
      已选用
    </Typography>
  ) : (
    <Button variant="text" size="small" onClick={handleSelect}>
      使用
    </Button>
  );
};

export default SelectButton;
