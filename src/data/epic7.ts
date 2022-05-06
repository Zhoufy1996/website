import {
  EquipmentLevel,
  EquipmentQuality,
  EquipmentType,
  PersonAttributeCode,
  EquipmentAttributeCode,
} from '../types/epic7';

export const personPropertyOptions: Record<
  PersonAttributeCode,
  {
    label: string;
  }
> = {
  attack: {
    label: '攻击力',
  },
  defense: {
    label: '防御力',
  },
  life: {
    label: '生命力',
  },
};

export const equipmentAttributeOptions: Record<
  EquipmentAttributeCode,
  {
    label: string;
    sortNo: number;
  }
> = {
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

export const equipmentQualityOptions: Record<EquipmentQuality, string> = {
  legend: '传说',
  hero: '英雄',
};

export const equipmentLevelOptions: Record<EquipmentLevel, string> = {
  88: '88',
  '72-85': '72-85',
  '58-71': '58-71',
};

export const equipmentTypeOptions: Record<
  EquipmentType,
  {
    label: string;
    primaryAttritube: EquipmentAttributeCode[];
    subAttributes: EquipmentAttributeCode[];
  }
> = {
  arms: {
    label: '武器',
    primaryAttritube: ['attack'],
    subAttributes: [
      'attack_percent',
      'life',
      'life_percent',
      'speed',
      'crit_rate',
      'crit_injury',
      'effect_hit',
      'effect_resistance',
    ],
  },
  helmet: {
    label: '头盔',
    primaryAttritube: ['life'],
    subAttributes: [
      'attack',
      'attack_percent',
      'defense',
      'defense_percent',
      'life_percent',
      'speed',
      'crit_rate',
      'crit_injury',
      'effect_hit',
      'effect_resistance',
    ],
  },
  armor: {
    label: '衣服',
    primaryAttritube: ['defense'],
    subAttributes: [
      'attack',
      'attack_percent',
      'defense_percent',
      'life',
      'life_percent',
      'speed',
      'crit_rate',
      'crit_injury',
      'effect_hit',
      'effect_resistance',
    ],
  },
  ring: {
    label: '戒指',
    primaryAttritube: [
      'attack',
      'attack_percent',
      'defense',
      'defense_percent',
      'life',
      'life_percent',
      'crit_rate',
      'crit_injury',
    ],
    subAttributes: [
      'attack',
      'attack_percent',
      'defense',
      'defense_percent',
      'life',
      'life_percent',
      'speed',
      'crit_rate',
      'crit_injury',
      'effect_hit',
      'effect_resistance',
    ],
  },
  necklace: {
    label: '项链',
    primaryAttritube: [
      'attack',
      'attack_percent',
      'defense',
      'defense_percent',
      'life',
      'life_percent',
      'effect_hit',
      'effect_resistance',
    ],
    subAttributes: [
      'attack',
      'attack_percent',
      'defense',
      'defense_percent',
      'life',
      'life_percent',
      'speed',
      'crit_rate',
      'crit_injury',
      'effect_hit',
      'effect_resistance',
    ],
  },
  shoe: {
    label: '鞋子',
    primaryAttritube: ['attack', 'attack_percent', 'defense', 'defense_percent', 'life', 'life_percent', 'speed'],
    subAttributes: [
      'attack',
      'attack_percent',
      'defense',
      'defense_percent',
      'life',
      'life_percent',
      'speed',
      'crit_rate',
      'crit_injury',
      'effect_hit',
      'effect_resistance',
    ],
  },
};
