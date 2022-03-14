import { useRecoilValue, useSetRecoilState } from 'recoil';
import Typography from '@mui/material/Typography';
import { TextField } from '@mui/material';
import { personTemplateState } from '../../store/epic7/equipment';
import { PersonTemplateCode, PropertyCode } from '../../types/epic7';

interface PropertyFieldData {
  label: string;
  sortNo: number;
}

const properFieldsOptions: Record<PropertyCode, PropertyFieldData> = {
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

const PersonTemplate = () => {
  const personTemplate = useRecoilValue(personTemplateState);
  const setPersonTemplate = useSetRecoilState(personTemplateState);

  return (
    <div>
      <Typography variant="h6">人物面板</Typography>
      {
          Object.entries(properFieldsOptions).map(([code, options]) => {
            return (
              <TextField
                key={code}
                id={code}
                label={options.label}
                type="number"
                variant="outlined"
                value={personTemplate[code as PersonTemplateCode]}
                inputProps={{
                  min: 0,
                }}
                onChange={(e) => {
                  setPersonTemplate((pre) => {
                    return {
                      ...pre,
                      [code]: Number(e.target.value),
                    };
                  });
                }}
              />
            );
          })
      }
    </div>
  );
};

export default PersonTemplate;
