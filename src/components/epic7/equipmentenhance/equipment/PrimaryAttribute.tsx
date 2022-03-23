import { useEffect, useMemo } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { MenuItem } from '@mui/material';
import {
  equipmentAttributeState, equipmentPrimaryAttributeState, equipmentTypeState,
} from '../../../../store/epic7/equipment';
import { EquipmentAttributeCode } from '../../../../types/epic7';
import { equipmentAttributeOptions, equipmentTypeOptions } from '../../../../data/epic7';
import CustomTextField from '../../../biz/CustomTextFiled';

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
    <CustomTextField
      id="primaryProperty"
      label="主属性"
      select
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
    </CustomTextField>
  );
};

export default PrimaryProperty;
