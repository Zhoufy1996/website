import { Divider, Typography } from '@mui/material';
import { useRecoilState } from 'recoil';
import { useCallback } from 'react';
import Select from '../../base/Select';
import { EquipmentState, equipmentState } from '../../../store/epic7/equipment';
import {
  equipmentAttributeOptions,
  equipmentLevelOptions,
  equipmentQualityOptions,
  equipmentTypeOptions,
} from '../../../data/epic7';
import { Equipment, EquipmentAttributeCode } from '../../../types/epic7';
import CustomTextField from '../../biz/CustomTextFiled';

const EquipmentComponent = () => {
  const [equipment, setEquipment] = useRecoilState(equipmentState);

  const changeEquipment = useCallback(
    (value: Partial<EquipmentState>) => {
      setEquipment((pre) => {
        return {
          ...pre,
          ...value,
        };
      });
    },
    [setEquipment]
  );

  const changeSubAttribute = useCallback(
    (value: Partial<EquipmentState['subAttributes']>) => {
      setEquipment((pre) => {
        return {
          ...pre,
          subAttributes: {
            ...pre.subAttributes,
            ...value,
          },
        };
      });
    },
    [setEquipment]
  );
  return (
    <div>
      <Typography variant="h6">装备</Typography>
      <Select
        dataSource={Object.entries(equipmentTypeOptions).map(([code, option]) => {
          return {
            value: code,
            label: option.label,
          };
        })}
        id="type"
        label="类型"
        value={equipment.type}
        onChange={(e) => {
          changeEquipment({
            type: e.target.value as Equipment['type'],
          });
        }}
      />
      <Select
        dataSource={Object.entries(equipmentLevelOptions).map(([code, label]) => {
          return {
            value: code,
            label,
          };
        })}
        id="level"
        label="装备等级"
        value={equipment.level}
        onChange={(e) => {
          changeEquipment({
            level: e.target.value as Equipment['level'],
          });
        }}
      />
      <Select
        dataSource={Object.entries(equipmentQualityOptions).map(([code, label]) => {
          return {
            value: code,
            label,
          };
        })}
        id="quality"
        label="装备品质"
        value={equipment.quality}
        onChange={(e) => {
          changeEquipment({
            quality: e.target.value as Equipment['quality'],
          });
        }}
      />
      <Select
        dataSource={equipmentTypeOptions[equipment.type].primaryAttritube.map((code) => {
          return {
            value: code,
            label: equipmentAttributeOptions[code].label,
          };
        })}
        id="primaryProperty"
        label="主属性"
        value={equipment.primaryAttribute}
        onChange={(e) => {
          changeEquipment({
            primaryAttribute: e.target.value as Equipment['primaryAttribute'],
          });
        }}
      />
      <Select
        dataSource={[
          {
            value: 0,
            label: '0 ~ 2',
          },
          {
            value: 3,
            label: '3 ~ 5',
          },
          {
            value: 6,
            label: '6 ~ 8',
          },
          {
            value: 9,
            label: '9 ~ 11',
          },
          {
            value: 12,
            label: '12 ~ 14',
          },
          {
            value: 15,
            label: '15',
          },
        ]}
        id="enhancedLevel"
        label="强化等级"
        value={equipment.enhancedLevel}
        onChange={(e) => {
          changeEquipment({
            enhancedLevel: e.target.value as unknown as Equipment['enhancedLevel'],
          });
        }}
      />
      <Divider />
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
              value={equipment.subAttributes[code as EquipmentAttributeCode]}
              inputProps={{
                min: 0,
              }}
              disabled={
                code === equipment.primaryAttribute ||
                !equipmentTypeOptions[equipment.type].subAttributes.includes(code as EquipmentAttributeCode)
              }
              onChange={(e) => {
                changeSubAttribute({
                  [code]: e.target.value,
                });
              }}
            />
          );
        })}
    </div>
  );
};

export default EquipmentComponent;
