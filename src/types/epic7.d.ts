export type PropertyCode = 'attack' | 'attack_percent' |
'defense' | 'defense_percent' |
'life' | 'life_percent' |
'speed' | 'crit_rate' | 'crit_injury' |
'effect_hit' | 'effect_resistance';

export interface OneEnhancedValue {
  value: number
  probability: number
}

export interface EquipmentPropertyItem {
  value: number
  code: PropertyCode
  oneEnhancedValueArray: OneEnhancedValue[]
}

export interface EquipmentProperty {
  items: EquipmentPropertyItem[]
  improvedLevel: number
  quality: 'legend' | 'epic'
}

export interface PersonTemplate {
  attack: number
  defense: number
  life: number
}
