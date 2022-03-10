import { OneEnhancedValue, PropertyCode } from '../types/epic7';

type EnhancedProbabilityObj = Record<PropertyCode, OneEnhancedValue[]>;

export const propertyArray: PropertyCode[] = [
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
];

export const enhancedProbabilityObj: EnhancedProbabilityObj = {
  attack: [],
  attack_percent: [],
  defense: [],
  defense_percent: [],
  life: [],
  life_percent: [],
  speed: [],
  crit_rate: [],
  crit_injury: [],
  effect_hit: [],
  effect_resistance: [],
};
