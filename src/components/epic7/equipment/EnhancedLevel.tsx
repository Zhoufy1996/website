import { useRecoilState } from 'recoil';
import { MenuItem, TextField } from '@mui/material';
import {
  equipmentEnhancedLevelState,
} from '../../../store/epic7/equipment';

const EnhancedLevel = () => {
  const [equipmentEnhancedLevel, setEquipmentEnhancedLevel] = useRecoilState(
    equipmentEnhancedLevelState,
  );

  return (
    <TextField
      id="enhancedLevel"
      label="强化等级"
      type="number"
      size="small"
      value={equipmentEnhancedLevel}
      select
      onChange={(e) => {
        setEquipmentEnhancedLevel(e.target.value as unknown as number);
      }}
    >
      <MenuItem value={0}>0 ~ 2</MenuItem>
      <MenuItem value={3}>3 ~ 5</MenuItem>
      <MenuItem value={6}>6 ~ 8</MenuItem>
      <MenuItem value={9}>9 ~ 11</MenuItem>
      <MenuItem value={12}>12 ~ 14</MenuItem>
      <MenuItem value={15}>15</MenuItem>
    </TextField>
  );
};

export default EnhancedLevel;
