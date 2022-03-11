import {
  Container, Box, TextField, Typography, Button,
} from '@mui/material';
import { createContext, useReducer, useState } from 'react';
import {
  EquipmentProperty, PersonTemplateCode, PropertyCode, EquipmentQuality,
} from '../../types/epic7';
import { enhanceMax } from '../../utils/epic7';

interface PropertyFieldData {
  label: string;
  sortNo: number;
}

type PropertyFieldsObj = Record<PropertyCode, PropertyFieldData>;

const properFieldsObj: PropertyFieldsObj = {
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

interface TemplateItem {
  label: string;
  sortNo: number;
}

const personTemplate: Record<PersonTemplateCode, TemplateItem> = {
  attack: {
    label: '攻击力',
    sortNo: 1,
  },
  defense: {
    label: '防御力',
    sortNo: 2,
  },
  life: {
    label: '生命力',
    sortNo: 3,
  },
};

interface EnhanceEquipmentContextData {
  equipmentData: Record<PropertyCode, number>;
  templateData: Record<PersonTemplateCode, number>;
  enhancedLevel: number;
  quality: EquipmentQuality;
}

const enhanceEquipmentData: EnhanceEquipmentContextData = {
  equipmentData: {
    attack: 0,
    attack_percent: 0,
    defense: 0,
    defense_percent: 0,
    life: 0,
    life_percent: 0,
    speed: 0,
    crit_rate: 0,
    crit_injury: 0,
    effect_hit: 0,
    effect_resistance: 0,
  },
  templateData: {
    attack: 1000,
    defense: 500,
    life: 500,
  },
  enhancedLevel: 0,
  quality: 'legend',
};

const EnhanceEquipmentContext = createContext<EnhanceEquipmentContextData>(enhanceEquipmentData);

interface EnhanceEquipmentReducer {
  (state: EnhanceEquipmentContextData): EnhanceEquipmentContextData
}

const reducer: EnhanceEquipmentReducer = (state, action) => {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    case 'decrement':
      return { count: state.count - 1 };
    default:
      throw new Error();
  }
};

const Epic7Container = () => {
  const [state, dispatch] = useReducer(reducer, enhanceEquipmentData);
  return (
    <EnhanceEquipmentContext.Provider value={state}>
      <div>123</div>
    </EnhanceEquipmentContext.Provider>
  );
};

/**
 * 数值模板
 * 当前装备数值
 * 有效属性
 * 当前+几
 * 模拟次数
 * 生成图像
 * 计算分数
 *  每跳加属性
 *  +15 最大分
 *  +15 最小分
 *  +15 均分
 */
const ScorePointsPage = () => {
  const [equipmentData, setEquipmentData] = useState<Record<PropertyCode, number>>({
    attack: 0,
    attack_percent: 0,
    defense: 0,
    defense_percent: 0,
    life: 0,
    life_percent: 0,
    speed: 0,
    crit_rate: 0,
    crit_injury: 0,
    effect_hit: 0,
    effect_resistance: 0,
  });

  const [templateData, setTemplateData] = useState<Record<PersonTemplateCode, number>>({
    attack: 1000,
    defense: 500,
    life: 500,
  });

  const [enhancedLevel, setEnhancedLevel] = useState<number>(0);

  const [enhanceCount, setEnhanceCount] = useState<number>(1);

  const [quality, setQuality] = useState<EquipmentQuality>('legend');

  const getEquimentProperty = (): EquipmentProperty => {
    return {
      items: Object.entries(equipmentData).map(([code, value]) => {
        return {
          code: code as PropertyCode,
          value,
          oneEnhancedValueArray: [],
        };
      }),
      enhancedLevel,
      quality,
    };
  };

  const handleEnhanceMax = () => {
    return enhanceMax(getEquimentProperty());
  };

  const validate = () => {
    const errors: string[] = [];
    const equipmentDataLength = Object.values(equipmentData).filter((n) => n > 0).length;
    if (quality === 'hero' && enhancedLevel < 12) {
      if (equipmentDataLength > 3) {
        errors.push('副属性超过了3项');
      }
    } else if (equipmentDataLength > 4) {
      errors.push('副属性超过了4项');
    }

    return errors;
  };

  return (
    <Container>
      <Box
        sx={{
          '& .MuiTextField-root': { m: 1, width: '25ch' },
        }}
        component="form"
        noValidate
        autoComplete="off"
      >
        <div>
          <Typography variant="h6">人物面板</Typography>
          {Object.entries(personTemplate)
            .map(([code, obj]) => {
              return (
                <TextField
                  key={code}
                  id={code}
                  label={obj.label}
                  type="number"
                  variant="outlined"
                  value={templateData[code as PersonTemplateCode]}
                  onChange={(e) => {
                    setTemplateData((pre) => {
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
            value={enhancedLevel}
            onChange={(e) => {
              setEnhancedLevel(Number(e.target.value));
            }}
          />
          <TextField
            id="quality"
            label="装备品质"
            select
            value={quality}
            onChange={(e) => {
              setQuality(e.target.value as EquipmentQuality);
            }}
          />
        </div>
        <div>
          {Object.entries(properFieldsObj)
            .sort((left, right) => {
              return left[1].sortNo - right[1].sortNo;
            })
            .map(([code, obj]) => {
              return (
                <TextField
                  key={code}
                  id={code}
                  label={obj.label}
                  type="number"
                  variant="outlined"
                  value={equipmentData[code as PropertyCode]}
                  onChange={(e) => {
                    setEquipmentData((pre) => {
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
        <div>
          <Typography variant="h6">模拟强化</Typography>
          <TextField
            id="enhancedLevel"
            label="强化次数"
            type="number"
            inputProps={{
              min: 1,
            }}
            value={enhanceCount}
            onChange={(e) => {
              setEnhanceCount(Number(e.target.value));
            }}
          />
          <Button
            onClick={handleEnhanceMax}
          >
            开始模拟
          </Button>
        </div>
      </Box>
    </Container>
  );
};

export default ScorePointsPage;
