import { atom, selector } from 'recoil';
import {
  Equipment,
  EquipmentQuality, PersonTemplate, PropertyCode,
} from '../../types/epic7';

export const personTemplateState = atom<PersonTemplate>({
  key: 'personTemplateState',
  default: {
    attack: 1000,
    defense: 500,
    life: 5000,
  },
});

export const equipmentQualityState = atom<EquipmentQuality>({
  key: 'equipmentQualityState',
  default: 'legend',
});

export const equipmentEnhancedLevelState = atom<number>({
  key: 'equipmentEnhancedLevelState',
  default: 0,
});

export const equipmentPropertyState = atom<Record<PropertyCode, number>>({
  key: 'equipmentPropertyState',
  default: {
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
});

export const equipmentState = selector<Equipment>({
  key: 'equipmentState',
  get: ({ get }) => {
    const equipmentPropertyValue = get(equipmentPropertyState);
    return {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      properties: Object.entries(equipmentPropertyValue).filter(([code, value]) => {
        return value > 0;
      }).map(([code, value]) => {
        return {
          code: code as PropertyCode,
          value,
          oneEnhancedValueArray: [],
        };
      }),
      enhancedLevel: get(equipmentEnhancedLevelState),
      quality: get(equipmentQualityState),
    };
  },
});

export const equipmentErrorsState = selector<string[]>({
  key: 'equipmentErrorsState',
  get: ({ get }) => {
    const errors: string[] = [];
    const { properties, quality, enhancedLevel } = get(equipmentState);
    if (quality === 'hero' && enhancedLevel < 12) {
      if (properties.length > 3) {
        errors.push('副属性超过了3项');
      }
    } else if (properties.length > 4) {
      errors.push('副属性超过了4项');
    }

    return errors;
  },
});
