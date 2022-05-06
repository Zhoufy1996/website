export type EquipmentAttributeCode =
  | 'attack'
  | 'attack_percent'
  | 'defense'
  | 'defense_percent'
  | 'life'
  | 'life_percent'
  | 'speed'
  | 'crit_rate'
  | 'crit_injury'
  | 'effect_hit'
  | 'effect_resistance';

export interface EquipmentSubAttributeItem {
  value: number;
  code: EquipmentAttributeCode;
}

export interface Equipment {
  type: 'arms' | 'helmet' | 'armor' | 'ring' | 'necklace' | 'shoe';
  level: '88' | '72-85' | '58-71';
  quality: 'legend' | 'hero';
  enhancedLevel: number;
  primaryAttribute: EquipmentAttributeCode;
  subAttributes: EquipmentSubAttributeItem[];
}

export interface PersonTemplate {
  id: string;
  name: string;
  status: 'draft' | 'published';
  attack: string;
  defense: string;
  life: string;
}
export interface EnhancedProbability {
  value: number;
  probability: number;
}

export interface ProbabilityDataItem {
  quality: EquipmentQuality;
  level: EquipmentLevel;
  code: PropertyCode;
  enhancedProbability: EnhancedProbability;
}
