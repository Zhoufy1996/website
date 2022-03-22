import { useEffect } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { MenuItem, TextField } from '@mui/material';
import { equipmentTypeOptions } from '../../../data/epic7';
import {
  equipmentTypeState,
  equipmentAttributeState,
  equipmentPrimaryAttributeState,
} from '../../../store/epic7/equipment';
import { EquipmentType } from '../../../types/epic7';

const Type = () => {
  const [equipmentType, setEquipmentType] = useRecoilState(equipmentTypeState);

  const setEquipmentPrimaryAttribute = useSetRecoilState(equipmentPrimaryAttributeState);
  const setEquipmentAttribute = useSetRecoilState(equipmentAttributeState);

  useEffect(() => {
    setEquipmentPrimaryAttribute(equipmentTypeOptions[equipmentType].primaryAttritube[0]);

    setEquipmentAttribute({
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
  }, [setEquipmentAttribute, equipmentType, setEquipmentPrimaryAttribute]);

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
