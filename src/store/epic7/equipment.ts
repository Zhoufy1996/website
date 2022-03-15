import { atom, selector } from 'recoil';
import { equipmentPropertyOptions, equipmentTypeOptions } from '../../data/epic7';
import {
  Equipment,
  EquipmentQuality, EquipmentType, PersonTemplate, PropertyCode,
} from '../../types/epic7';

export const personTemplateState = atom<PersonTemplate>({
  key: 'personTemplateState',
  default: {
    attack: '1000',
    defense: '500',
    life: '5000',
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

export const equipmentTypeState = atom<EquipmentType>({
  key: 'equipmentTypeState',
  default: 'arms',
});

export const equipmentPropertyState = atom<Record<PropertyCode, string>>({
  key: 'equipmentPropertyState',
  default: {
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

export const equipmentPrimaryPropertyState = atom<PropertyCode>({
  key: 'equipmentPrimaryPropertyState',
  default: 'attack',
});

export const equipmentState = selector<Equipment>({
  key: 'equipmentState',
  get: ({ get }) => {
    const equipmentPropertyValue = get(equipmentPropertyState);
    return {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      properties: Object.entries(equipmentPropertyValue).filter(([code, value]) => {
        return value !== '';
      }).map(([code, value]) => {
        return {
          code: code as PropertyCode,
          value: Number(value),
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
      if (properties.length !== 3) {
        errors.push('副属性应该是3项');
      }
    } else if (properties.length !== 4) {
      errors.push('副属性应该是4项');
    }

    return errors;
  },
});

export const primarySelectOptionsState = selector({
  key: 'primarySelectOptionsState',
  get: ({ get }) => {
    return equipmentTypeOptions[get(equipmentTypeState)].primaryProperty.map((code) => {
      return {
        code,
        label: equipmentPropertyOptions[code].label,
      };
    });
  },
});
