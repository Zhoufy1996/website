import { useEffect, useMemo } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { MenuItem, TextField } from '@mui/material';
import {
  equipmentAttributeState, equipmentPrimaryAttributeState, equipmentTypeState,
} from '../../../../store/epic7/equipment';
import { EquipmentAttributeCode } from '../../../../types/epic7';
import { equipmentAttributeOptions, equipmentTypeOptions } from '../../../../data/epic7';

const PrimaryProperty = () => {
  const [equipmentPrimaryProperty, setEquipmentPrimaryProperty] = useRecoilState(
    equipmentPrimaryAttributeState,
  );

  const equipmentType = useRecoilValue(equipmentTypeState);
  const setEquipmentProperty = useSetRecoilState(equipmentAttributeState);

  useEffect(() => {
    setEquipmentProperty((pre) => {
      return {
        ...pre,
        [equipmentPrimaryProperty]: '',
      };
    });
  }, [setEquipmentProperty, equipmentPrimaryProperty]);

  const primarySelectOptions = useMemo(() => {
    return equipmentTypeOptions[equipmentType].primaryAttritube.map((code) => {
      return {
        code,
        label: equipmentAttributeOptions[code].label,
      };
    });
  }, [equipmentType]);

  return (
    <TextField
      id="primaryProperty"
      label="主属性"
      select
      size="small"
      value={equipmentPrimaryProperty}
      onChange={(e) => {
        setEquipmentPrimaryProperty(e.target.value as EquipmentAttributeCode);
      }}
    >
      {
      primarySelectOptions.map((options) => {
        return (
          <MenuItem value={options.code} key={options.code}>
            {options.label}
          </MenuItem>
        );
      })
    }
    </TextField>
  );
};

export default PrimaryProperty;
