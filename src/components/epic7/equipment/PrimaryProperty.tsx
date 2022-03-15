import { useEffect } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { MenuItem } from '@mui/material';
import CustomTextField from '../CustomTextField';
import {
  equipmentPrimaryPropertyState, primarySelectOptionsState, equipmentPropertyState,
} from '../../../store/epic7/equipment';
import { PropertyCode } from '../../../types/epic7';

const PrimaryProperty = () => {
  const equipmentPrimaryProperty = useRecoilValue(equipmentPrimaryPropertyState);
  const setEquipmentPrimaryProperty = useSetRecoilState(equipmentPrimaryPropertyState);

  const primarySelectOptions = useRecoilValue(primarySelectOptionsState);
  const setEquipmentProperty = useSetRecoilState(equipmentPropertyState);

  useEffect(() => {
    setEquipmentProperty((pre) => {
      return {
        ...pre,
        [equipmentPrimaryProperty]: '',
      };
    });
  }, [setEquipmentProperty, equipmentPrimaryProperty]);

  return (
    <CustomTextField
      id="primaryProperty"
      label="主属性"
      select
      value={equipmentPrimaryProperty}
      onChange={(e) => {
        setEquipmentPrimaryProperty(e.target.value as PropertyCode);
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
