import { useRecoilState } from 'recoil';
import { MenuItem } from '@mui/material';
import { equipmentTypeOptions } from '../../../../data/epic7';
import {
  equipmentTypeState,
} from '../../../../store/epic7/equipment';
import { EquipmentType } from '../../../../types/epic7';
import CustomTextField from '../../../biz/CustomTextFiled';

const Type = () => {
  const [equipmentType, setEquipmentType] = useRecoilState(equipmentTypeState);

  return (
    <CustomTextField
      id="type"
      label="类型"
      select
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
    </CustomTextField>
  );
};

export default Type;
