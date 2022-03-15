import { useRecoilValue, useSetRecoilState } from 'recoil';
import { MenuItem } from '@mui/material';
import CustomTextField from '../CustomTextField';
import {
  equipmentQualityState,
} from '../../../store/epic7/equipment';
import { equipmentQualityOptions } from '../../../data/epic7';
import { EquipmentQuality } from '../../../types/epic7';

const Quality = () => {
  const equipmentQuality = useRecoilValue(equipmentQualityState);
  const setEquipmentQuality = useSetRecoilState(equipmentQualityState);

  return (
    <CustomTextField
      id="quality"
      label="装备品质"
      select
      value={equipmentQuality}
      onChange={(e) => {
        setEquipmentQuality(e.target.value as EquipmentQuality);
      }}
    >
      {
            Object.entries(equipmentQualityOptions).map(([code, label]) => {
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

export default Quality;
