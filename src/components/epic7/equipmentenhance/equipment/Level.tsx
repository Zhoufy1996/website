import { useRecoilState } from 'recoil';
import { MenuItem } from '@mui/material';
import {
  equipmentLevelState,
} from '../../../../store/epic7/equipment';
import { equipmentLevelOptions } from '../../../../data/epic7';
import { EquipmentLevel } from '../../../../types/epic7';
import CustomTextField from '../../../biz/CustomTextFiled';

const Level = () => {
  const [equipmentLevel, setEquipmentLevel] = useRecoilState(equipmentLevelState);

  return (
    <CustomTextField
      id="quality"
      label="装备等级"
      select
      value={equipmentLevel}
      onChange={(e) => {
        setEquipmentLevel(e.target.value as EquipmentLevel);
      }}
    >
      {
            Object.entries(equipmentLevelOptions).map(([code, label]) => {
              return (
                <MenuItem value={code} key={code}>
                  {label}
                </MenuItem>
              );
            })
        }
    </CustomTextField>
  );
};

export default Level;
