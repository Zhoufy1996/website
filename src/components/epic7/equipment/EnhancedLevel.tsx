import { useRecoilValue, useSetRecoilState } from 'recoil';
import { MenuItem } from '@mui/material';
import CustomTextField from '../CustomTextField';
import {
  equipmentEnhancedLevelState,
} from '../../../store/epic7/equipment';

const EnhancedLevel = () => {
  const equipmentEnhancedLevel = useRecoilValue(equipmentEnhancedLevelState);
  const setEquipmentEnhancedLevel = useSetRecoilState(equipmentEnhancedLevelState);

  return (
    <CustomTextField
      id="enhancedLevel"
      label="强化等级"
      type="number"
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
    </CustomTextField>
  );
};

export default EnhancedLevel;
