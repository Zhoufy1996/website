import { MenuItem, TextField, Typography } from '@mui/material';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { equipmentEnhancedLevelState, equipmentPropertyState, equipmentQualityState } from '../../store/epic7/equipment';
import { EquipmentQuality, PropertyCode } from '../../types/epic7';

const equipmentQualityOptions: Record<EquipmentQuality, string> = {
  legend: '传说',
  hero: '英雄',
};

const equipmentPropertyOptions: Record<PropertyCode, {
  label: string;
  sortNo: number
}> = {
  attack_percent: {
    label: '攻击力(%)',
    sortNo: 1,
  },
  defense_percent: {
    label: '防御力(%)',
    sortNo: 2,
  },
  life_percent: {
    label: '生命力(%)',
    sortNo: 3,
  },
  speed: {
    label: '速度',
    sortNo: 4,
  },
  crit_rate: {
    label: '暴击率(%)',
    sortNo: 5,
  },
  crit_injury: {
    label: '暴击伤害(%)',
    sortNo: 6,
  },
  effect_hit: {
    label: '效果命中(%)',
    sortNo: 7,
  },
  effect_resistance: {
    label: '效果抗性(%)',
    sortNo: 8,
  },
  attack: {
    label: '攻击力',
    sortNo: 9,
  },
  defense: {
    label: '防御力',
    sortNo: 10,
  },
  life: {
    label: '生命力',
    sortNo: 11,
  },
};

const Equipment = () => {
  const equipmentEnhancedLevel = useRecoilValue(equipmentEnhancedLevelState);
  const setEquipmentEnhancedLevel = useSetRecoilState(equipmentEnhancedLevelState);

  const equipmentQuality = useRecoilValue(equipmentQualityState);
  const setEquipmentQuality = useSetRecoilState(equipmentQualityState);

  const equipmentProperty = useRecoilValue(equipmentPropertyState);
  const setEquipmentProperty = useSetRecoilState(equipmentPropertyState);

  return (
    <div>
      <Typography variant="h6">装备</Typography>
      <TextField
        id="enhancedLevel"
        label="强化等级"
        type="number"
        inputProps={{
          min: 0,
          max: 15,
        }}
        value={equipmentEnhancedLevel}
        onChange={(e) => {
          setEquipmentEnhancedLevel(Number(e.target.value));
        }}
      />
      <TextField
        id="quality"
        label="装备品质"
        select
        value={equipmentQuality}
        onChange={(e) => {
          setEquipmentQuality(e.target.value as EquipmentQuality);
        }}
      >
        {
            Object.entries(equipmentQualityOptions).map(([code, label]) => {
              return (
                <MenuItem value={code} key={code}>
                  {label}
                </MenuItem>
              );
            })
        }
      </TextField>
      {Object.entries(equipmentPropertyOptions)
        .sort((left, right) => {
          return left[1].sortNo - right[1].sortNo;
        })
        .map(([code, options]) => {
          return (
            <TextField
              key={code}
              id={code}
              label={options.label}
              type="number"
              variant="outlined"
              value={equipmentProperty[code as PropertyCode]}
              onChange={(e) => {
                setEquipmentProperty((pre) => {
                  return {
                    ...pre,
                    [code]: Number(e.target.value),
                  };
                });
              }}
              inputProps={{
                min: 0,
              }}
            />
          );
        })}
    </div>
  );
};

export default Equipment;
