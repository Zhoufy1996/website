import { useEffect } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { MenuItem } from '@mui/material';
import { equipmentTypeOptions } from '../../../data/epic7';
import CustomTextField from '../CustomTextField';
import {
  equipmentTypeState,
  equipmentPrimaryPropertyState,
  equipmentPropertyState,
} from '../../../store/epic7/equipment';
import { EquipmentType } from '../../../types/epic7';

const Type = () => {
  const equipmentType = useRecoilValue(equipmentTypeState);
  const setEquipmentType = useSetRecoilState(equipmentTypeState);

  const setEquipmentPrimaryProperty = useSetRecoilState(equipmentPrimaryPropertyState);
  const setEquipmentProperty = useSetRecoilState(equipmentPropertyState);

  useEffect(() => {
    setEquipmentPrimaryProperty(equipmentTypeOptions[equipmentType].primaryProperty[0]);
    setEquipmentProperty({
      attack: '',
      attack_percent: '',
      defense: '',
      defense_percent: '',
      life: '',
      life_percent: '',
      speed: '',
      crit_rate: '',
      crit_injury: '',
      effect_hit: '',
      effect_resistance: '',
    });
  }, [setEquipmentPrimaryProperty, equipmentType, setEquipmentProperty]);

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
