export type PropertyCode = 'attack' | 'attack_percent' |
'defense' | 'defense_percent' |
'life' | 'life_percent' |
'speed' | 'crit_rate' | 'crit_injury' |
'effect_hit' | 'effect_resistance';

export type PersonPropertyCode = 'attack' | 'defense' | 'life';

type EquipmentType = 'arms' | 'helmet' | 'armor' | 'ring' | 'necklace' | 'shoe';

export interface OneEnhancedValue {
  value: number
  probability: number
}

export interface EquipmentPropertyItem {
  value: number
  code: PropertyCode
  oneEnhancedValueArray: OneEnhancedValue[]
}

export type EquipmentQuality = 'legend' | 'hero';

export interface Equipment {
  properties: EquipmentPropertyItem[]
  enhancedLevel: number
  quality: EquipmentQuality
}

export interface PersonTemplate {
  attack: string
  defense: string
  life: string
}

export type PersonTemplateCode = keyof PersonTemplate;
