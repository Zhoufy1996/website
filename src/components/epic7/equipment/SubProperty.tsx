import { useRecoilValue, useSetRecoilState } from 'recoil';
import { equipmentTypeOptions, equipmentPropertyOptions } from '../../../data/epic7';
import {
  equipmentPrimaryPropertyState, equipmentPropertyState, equipmentTypeState,
} from '../../../store/epic7/equipment';
import { PropertyCode } from '../../../types/epic7';
import CustomTextField from '../CustomTextField';

const SubProperty = () => {
  const equipmentType = useRecoilValue(equipmentTypeState);

  const equipmentProperty = useRecoilValue(equipmentPropertyState);
  const setEquipmentProperty = useSetRecoilState(equipmentPropertyState);
  const equipmentPrimaryProperty = useRecoilValue(equipmentPrimaryPropertyState);

  const { effectProperty } = equipmentTypeOptions[equipmentType];

  return (
    <>
      {Object.entries(equipmentPropertyOptions)
        .sort((left, right) => {
          return left[1].sortNo - right[1].sortNo;
        })
        .map(([code, options]) => {
          return (
            <CustomTextField
              key={code}
              id={code}
              label={options.label}
              type="number"
              variant="outlined"
              value={equipmentProperty[code as PropertyCode] || ''}
              onChange={(e) => {
                setEquipmentProperty((pre) => {
                  return {
                    ...pre,
                    [code]: e.target.value,
                  };
                });
              }}
              disabled={code === equipmentPrimaryProperty
                || !effectProperty.includes(code as PropertyCode)}
              inputProps={{
                min: 0,
              }}
            />
          );
        })}
    </>
  );
};

export default SubProperty;
