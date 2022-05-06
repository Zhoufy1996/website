import { v4 as uuidv4 } from 'uuid';
import { Equipment, EquipmentAttributeCode, EquipmentSubAttributeItem, PersonTemplate } from '../types/epic7';
import { randomSelect } from './helper';
import enhancedProbabilityData from '../data/epci7_probability_data.json';

export const propertyArray: EquipmentAttributeCode[] = [
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

interface CalcEqipmentScore {
  (props: { equipmentProperty: Equipment; personTemplate?: PersonTemplate }): number;
}

/**
 *
 * @param {equipmentProperty: 装备属性, personTemplate: 人物属性模板}
 * @returns 装备分数
 */
export const calcEqipmentScore: CalcEqipmentScore = ({ equipmentProperty, personTemplate }) => {
  type ScoreCalcObj = Record<EquipmentAttributeCode, (value: number) => number>;
  const scoreCalcObj: ScoreCalcObj = {
    attack: (value) => (personTemplate && personTemplate.attack ? (value * 100) / Number(personTemplate.attack) : 0),
    attack_percent: (value) => value,
    defense: (value) => (personTemplate && personTemplate.defense ? (value * 100) / Number(personTemplate.defense) : 0),
    defense_percent: (value) => value,
    life: (value) => (personTemplate && personTemplate.life ? (value * 100) / Number(personTemplate.life) : 0),
    life_percent: (value) => value,
    speed: (value) => value * 2,
    crit_rate: (value) => (value * 8) / 5,
    crit_injury: (value) => (value * 8) / 7,
    effect_hit: (value) => value,
    effect_resistance: (value) => value,
  };

  return Number(
    equipmentProperty.subAttributes
      .map((property) => {
        return scoreCalcObj[property.code](property.value);
      })
      .reduce((acc, cur) => {
        return acc + cur;
      }, 0)
      .toFixed(1)
  );
};

// 强化一次装备属性
export const enhanceOnce = (equipment: Equipment): Equipment => {
  const getEnhanceItem = (): EquipmentSubAttributeItem => {
    return randomSelect(equipment.subAttributes);
  };

  const enhancedProperties = enhancedProbabilityData.filter((item) => {
    return item.quality === equipment.quality && item.level === equipment.level;
  });

  const getRestEnhanceItem = (): EquipmentSubAttributeItem => {
    const existPropertyCode = equipment.subAttributes.map((item) => item.code);
    const notExistPropertyCode = propertyArray.filter((code) => !existPropertyCode.includes(code));
    return {
      value: 0,
      code: randomSelect(notExistPropertyCode),
    };
  };

  const getEnhanceValue = (equipmentSubAttributeItem: EquipmentSubAttributeItem): number => {
    const randomValue = Math.random() * 100;
    let restValue = randomValue;
    let index = 0;

    const attritubeEnhancedProbabilities = enhancedProperties.find(
      (item) => item.code === equipmentSubAttributeItem.code
    )?.enhancedProperties;

    if (attritubeEnhancedProbabilities == null) {
      return 0;
    }

    while (restValue >= 0 && attritubeEnhancedProbabilities[index] != null) {
      restValue -= attritubeEnhancedProbabilities[index].probability;
      index += 1;
    }

    return attritubeEnhancedProbabilities[index - 1].value;
  };

  const enhanceItemOnce = (equipmentAttributeItem: EquipmentSubAttributeItem): EquipmentSubAttributeItem => {
    return {
      ...equipmentAttributeItem,
      value: equipmentAttributeItem.value + getEnhanceValue(equipmentAttributeItem),
    };
  };

  const shouldAddOneProperty = () => {
    return equipment.quality === 'hero' && equipment.enhancedLevel >= 9 && equipment.enhancedLevel < 12;
  };

  let enhanceItem: EquipmentSubAttributeItem;

  if (shouldAddOneProperty()) {
    enhanceItem = getRestEnhanceItem();

    return {
      ...equipment,
      subAttributes: [...equipment.subAttributes, enhanceItemOnce(enhanceItem)],
    };
  }

  enhanceItem = getEnhanceItem();

  return {
    ...equipment,
    enhancedLevel: equipment.enhancedLevel + 3,
    subAttributes: equipment.subAttributes.map((equipmentAttributeItem) => {
      if (equipmentAttributeItem.code === enhanceItem.code) {
        return enhanceItemOnce(equipmentAttributeItem);
      }

      return equipmentAttributeItem;
    }),
  };
};

// 强化到15
export const enhanceMax = (equipmentProperty: Equipment): Equipment => {
  let temp = equipmentProperty;
  while (temp.enhancedLevel < 15) {
    temp = enhanceOnce(temp);
  }

  return temp;
};

export const getInitialPersonTemplate = (): PersonTemplate => {
  return {
    id: uuidv4(),
    name: '',
    attack: '1000',
    defense: '500',
    life: '5000',
    status: 'draft',
  };
};
