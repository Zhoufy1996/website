import { useRecoilValue, useSetRecoilState } from 'recoil';
import { equipmentTypeOptions, equipmentAttributeOptions } from '../../../data/epic7';
import {
  equipmentAttributeState,
  equipmentPrimaryAttributeState,
  equipmentTypeState,
} from '../../../store/epic7/equipment';
import { EquipmentAttributeCode } from '../../../types/epic7';
import CustomTextField from '../CustomTextField';

const SubProperty = () => {
  const equipmentType = useRecoilValue(equipmentTypeState);

  const equipmentAttribute = useRecoilValue(equipmentAttributeState);
  const setEquipmenAttribute = useSetRecoilState(equipmentAttributeState);
  const equipmentPrimaryProperty = useRecoilValue(equipmentPrimaryAttributeState);

  const { subAttributes } = equipmentTypeOptions[equipmentType];

  return (
    <>
      {Object.entries(equipmentAttributeOptions)
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
              value={equipmentAttribute[code as EquipmentAttributeCode]}
              onChange={(e) => {
                setEquipmenAttribute((pre) => {
                  return {
                    ...pre,
                    [code]: e.target.value,
                  };
                });
              }}
              disabled={code === equipmentPrimaryProperty
                || !subAttributes.includes(code as EquipmentAttributeCode)}
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
