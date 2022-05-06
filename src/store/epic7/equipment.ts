import { atom, DefaultValue } from 'recoil';
import { equipmentTypeOptions } from '../../data/epic7';
import { Equipment, EquipmentAttributeCode } from '../../types/epic7';

export interface EquipmentState extends Omit<Equipment, 'subAttributes'> {
  subAttributes: Record<EquipmentAttributeCode, ''>;
}

export const equipmentState = atom<EquipmentState>({
  key: 'equipmentState',
  default: {
    type: 'arms',
    level: '72-85',
    quality: 'legend',
    enhancedLevel: 0,
    primaryAttribute: 'attack',
    subAttributes: {
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
    },
  },
  effects_UNSTABLE: [
    ({ onSet, setSelf }) => {
      onSet((newValue, oldValue) => {
        if (!(oldValue instanceof DefaultValue)) {
          if (newValue.type !== oldValue.type) {
            setSelf({
              ...newValue,
              primaryAttribute: equipmentTypeOptions[newValue.type].primaryAttritube[0],
              subAttributes: {
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
              },
            });
          }
        }
      });
    },
  ],
});
