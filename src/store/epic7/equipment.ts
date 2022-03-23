import { atom, selector } from 'recoil';
import { Equipment, EquipmentAttributeCode } from '../../types/epic7';
import { personTemplatePresetArrayState } from './template';

export const selectedTemplateIdState = atom<string>({
  key: 'selectedTemplateIdState',
  default: '',
});

export const personTemplateState = selector({
  key: 'personTemplateState',
  get: ({ get }) => {
    const selectedId = get(selectedTemplateIdState);
    return get(personTemplatePresetArrayState).find((item) => item.id === selectedId);
  },
});

export const equipmentQualityState = atom<Equipment['quality']>({
  key: 'equipmentQualityState',
  default: 'legend',
});

export const equipmentEnhancedLevelState = atom<Equipment['enhancedLevel']>({
  key: 'equipmentEnhancedLevelState',
  default: 0,
});

export const equipmentLevelState = atom<Equipment['level']>({
  key: 'equipmentLevelState',
  default: '72-85',
});

export const equipmentTypeState = atom<Equipment['type']>({
  key: 'equipmentTypeState',
  default: 'arms',
});

export const equipmentPrimaryAttributeState = atom<Equipment['primaryAttribute']>({
  key: 'equipmentPrimaryAttributeState',
  default: 'attack',
});

export const equipmentAttributeState = atom<Record<EquipmentAttributeCode, string>>({
  key: 'equipmentAttributeState',
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

export const equipmentState = selector<Equipment>({
  key: 'equipmentState',
  get: ({ get }) => {
    return {
      type: get(equipmentTypeState),
      level: get(equipmentLevelState),
      quality: get(equipmentQualityState),
      primaryAttribute: get(equipmentPrimaryAttributeState),
      enhancedLevel: get(equipmentEnhancedLevelState),
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      subAttributes: Object.entries(get(equipmentAttributeState)).filter(([code, value]) => {
        return value !== '';
      }).map(([code, value]) => {
        return {
          code: code as EquipmentAttributeCode,
          value: Number(value),
        };
      }),
    };
  },
});

export const equipmentErrorsState = selector<string[]>({
  key: 'equipmentErrorsState',
  get: ({ get }) => {
    const errors: string[] = [];
    const {
      quality, enhancedLevel, subAttributes,
    } = get(equipmentState);
    if (quality === 'hero' && enhancedLevel < 12) {
      if (subAttributes.length !== 3) {
        errors.push('副属性应该是3项');
      }
    } else if (subAttributes.length !== 4) {
      errors.push('副属性应该是4项');
    }

    return errors;
  },
});
