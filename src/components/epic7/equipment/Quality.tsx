import { useRecoilState } from 'recoil';
import { MenuItem, TextField } from '@mui/material';
import {
  equipmentQualityState,
} from '../../../store/epic7/equipment';
import { equipmentQualityOptions } from '../../../data/epic7';
import { EquipmentQuality } from '../../../types/epic7';

const Quality = () => {
  const [equipmentQuality, setEquipmentQuality] = useRecoilState(equipmentQualityState);

  return (
    <TextField
      id="quality"
      label="装备品质"
      select
      value={equipmentQuality}
      size="small"
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
    </TextField>
  );
};

export default Quality;
