import { v4 as uuidv4 } from 'uuid';
import {
  Equipment, EquipmentAttributeCode,
  EquipmentSubAttributeItem, PersonTemplate, PersonTemplatePreset,
} from '../types/epic7';
import { randomSelect } from './helper';
import enhancedProbabilityData from '../data/epci7_probability_data.json';
import { getLocalStorage } from './localStorage';

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
  (props: {
    equipmentProperty: Equipment;
    personTemplate?: PersonTemplate
  }): number
}

/**
 *
 * @param {equipmentProperty: 装备属性, personTemplate: 人物属性模板}
 * @returns 装备分数
 */
export const calcEqipmentScore: CalcEqipmentScore = ({ equipmentProperty, personTemplate }) => {
  type ScoreCalcObj = Record<EquipmentAttributeCode, (value: number) => number>;
  const scoreCalcObj: ScoreCalcObj = {
    attack: (value) => (personTemplate && personTemplate.attack
      ? (value * 100) / Number(personTemplate.attack) : 0),
    attack_percent: (value) => value,
    defense: (value) => (personTemplate && personTemplate.defense
      ? (value * 100) / Number(personTemplate.defense) : 0),
    defense_percent: (value) => value,
    life: (value) => (personTemplate && personTemplate.life
      ? (value * 100) / Number(personTemplate.life) : 0),
    life_percent: (value) => value,
    speed: (value) => value * 2,
    crit_rate: (value) => (value * 8) / 5,
    crit_injury: (value) => (value * 8) / 7,
    effect_hit: (value) => value,
    effect_resistance: (value) => value,
  };

  return Number(equipmentProperty.subAttributes.map((property) => {
    return scoreCalcObj[property.code](property.value);
  }).reduce((acc, cur) => {
    return acc + cur;
  }, 0).toFixed(1));
};

// 强化一次装备属性
export const enhanceOnce = (equipment: Equipment): Equipment => {
  const getEnhanceItem = () : EquipmentSubAttributeItem => {
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

    const attritubeEnhancedProbabilities = enhancedProperties
      .find((item) => item.code === equipmentSubAttributeItem.code)?.enhancedProperties;

    if (attritubeEnhancedProbabilities == null) {
      return 0;
    }

    while (restValue >= 0 && attritubeEnhancedProbabilities[index] != null) {
      restValue -= attritubeEnhancedProbabilities[index].probability;
      index += 1;
    }

    return attritubeEnhancedProbabilities[index - 1].value;
  };

  const enhanceItemOnce = (equipmentAttributeItem: EquipmentSubAttributeItem)
  :EquipmentSubAttributeItem => {
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
      subAttributes: [
        ...equipment.subAttributes,
        enhanceItemOnce(enhanceItem),
      ],
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

interface BrushBookmarkProps {
  diamonds?: number;
  normalBookmarkCount?: number;
  mysteriousBookmarkCount?: number;
}

interface BrushBookmarkReturn {
  diamonds: number;
  gold: number
  normalBookmarkCount: number;
  mysteriousBookmarkCount: number;
}

/**
 * 给定钻石，计算需要的金币和可以刷出来的书签
 * 给定书签数，计算需要的钻石和金币
 */
export const BrushBookmark = ({
  diamonds = 0,
  normalBookmarkCount = 0,
  mysteriousBookmarkCount = 0,
}: BrushBookmarkProps): BrushBookmarkReturn => {
  const refreshDiamond = 3; // 每次刷新所需钻石数
  const refreshGrid = 6; // 每次刷新的格子数

  const normalBookmarkGold = 18.4; // 普通书签价格
  const mysteriousBookmarkGold = 28.5; // 神秘书签价格

  const normalBookmarkProbability = 0.0064;
  const mysteriousBookmarkProbability = 0.0016;

  const calcDiamondPrice = (probability: number) => {
    return refreshDiamond / (refreshGrid * probability);
  };

  const normalBookmarkPrice = calcDiamondPrice(normalBookmarkProbability);
  const mysteriousBookmarkPrice = calcDiamondPrice(mysteriousBookmarkProbability);

  // 给定书签数，计算需要的钻石和金币
  if (diamonds === 0) {
    const normalDiamonds = normalBookmarkPrice * normalBookmarkCount;
    const mysteriousDiamonds = mysteriousBookmarkPrice * mysteriousBookmarkCount;

    let realNormalBookmarkCount: number;
    let realMysteriousBookmarkCount: number;

    // 使用所需钻石数更多的一项对另一项重新计算
    if (normalDiamonds > mysteriousDiamonds) {
      realNormalBookmarkCount = normalDiamonds;
      realMysteriousBookmarkCount = Math.floor(normalDiamonds / normalBookmarkPrice);
    } else {
      realMysteriousBookmarkCount = mysteriousBookmarkCount;
      realNormalBookmarkCount = Math.floor(mysteriousDiamonds / mysteriousBookmarkPrice);
    }

    return {
      diamonds: Math.max(normalDiamonds, mysteriousDiamonds),
      normalBookmarkCount: realNormalBookmarkCount,
      mysteriousBookmarkCount: realMysteriousBookmarkCount,
      gold: realNormalBookmarkCount * normalBookmarkGold
        + realMysteriousBookmarkCount * mysteriousBookmarkGold,
    };
  }

  // 给定钻石和金币，计算可以刷出来的书签
  const normalBookmarkCountTemp = Math.floor((diamonds / normalBookmarkPrice));

  const mysteriousBookCountTemp = Math.floor((diamonds / mysteriousBookmarkPrice));

  const gold = normalBookmarkCountTemp * normalBookmarkGold
    + mysteriousBookCountTemp * mysteriousBookmarkGold;

  return {
    diamonds,
    gold,
    normalBookmarkCount: normalBookmarkCountTemp,
    mysteriousBookmarkCount: mysteriousBookCountTemp,
  };
};

export const getNoRepeatName = () => {
  const names: string[] = JSON.parse(getLocalStorage('personTemplates') || '[]').map((item: PersonTemplatePreset) => item.name);
  let index = 1;
  const getName = () => {
    return `默认模板-${index}`;
  };
  while (names.includes(getName())) {
    index += 1;
  }

  return getName();
};

export const getInitialPersonTemplate = (): PersonTemplatePreset => {
  return {
    id: uuidv4(),
    name: getNoRepeatName(),
    attack: '1000',
    defense: '500',
    life: '5000',
  };
};

export const getInitialPersonTemplateList = (): PersonTemplatePreset[] => {
  const localData = getLocalStorage('personTemplates');
  if (localData) {
    return JSON.parse(localData);
  }

  return [getInitialPersonTemplate()];
};
