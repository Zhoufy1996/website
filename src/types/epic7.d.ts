export type EquipmentAttributeCode = 'attack' | 'attack_percent' |
'defense' | 'defense_percent' |
'life' | 'life_percent' |
'speed' | 'crit_rate' | 'crit_injury' |
'effect_hit' | 'effect_resistance';

export type PersonAttritubeCode = 'attack' | 'defense' | 'life';

export type EquipmentType = 'arms' | 'helmet' | 'armor' | 'ring' | 'necklace' | 'shoe';

export type EquipmentLevel = '88' | '72-85' | '58-71';

export type EquipmentQuality = 'legend' | 'hero';

export interface EquipmentSubAttributeItem {
  value: number
  code: EquipmentAttributeCode
}

export interface Equipment {
  type: EquipmentType
  level: EquipmentLevel
  quality: EquipmentQuality
  enhancedLevel: number
  primaryAttribute: EquipmentAttributeCode
  subAttributes: EquipmentSubAttributeItem[]
}

export type PersonAttributeCode = 'attack' | 'defense' | 'life';

export type PersonTemplate = Record<PersonAttributeCode, string>;

export interface EnhancedProbability {
  value: number
  probability: number
}

export interface ProbabilityDataItem {
  quality: EquipmentQuality
  level:EquipmentLevel
  code: PropertyCode
  enhancedProbability: EnhancedProbability
}

export interface PersonTemplatePreset extends PersonTemplate {
  id: string;
  name: string;
}
