import { useRecoilState } from 'recoil';
import { MenuItem, TextField } from '@mui/material';
import { equipmentTypeOptions } from '../../../../data/epic7';
import {
  equipmentTypeState,
} from '../../../../store/epic7/equipment';
import { EquipmentType } from '../../../../types/epic7';

const Type = () => {
  const [equipmentType, setEquipmentType] = useRecoilState(equipmentTypeState);

  return (
    <TextField
      id="type"
      label="类型"
      select
      size="small"
      value={equipmentType}
      onChange={(e) => {
        const type = e.target.value as EquipmentType;
        setEquipmentType(type);
      }}
    >
      {
        Object.entries(equipmentTypeOptions).map(([code, option]) => {
          return (
            <MenuItem value={code} key={code}>
              {option.label}
            </MenuItem>
          );
        })
    }
    </TextField>
  );
};

export default Type;
