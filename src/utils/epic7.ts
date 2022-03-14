import {
  Equipment, EquipmentPropertyItem, OneEnhancedValue, PersonTemplate, PropertyCode,
} from '../types/epic7';
import { randomSelect } from './helper';

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

export const enhancedProbabilityOptions: EnhancedProbabilityObj = {
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

interface CalcEqipmentScore {
  (props: {
    equipmentProperty: Equipment;
    personTemplate: PersonTemplate
  }): number
}

/**
 *
 * @param {equipmentProperty: 装备属性, personTemplate: 人物属性模板}
 * @returns 装备分数
 */
export const calcEqipmentScore: CalcEqipmentScore = ({ equipmentProperty, personTemplate }) => {
  type ScoreCalcObj = Record<PropertyCode, (value: number) => number>;

  const scoreCalcObj: ScoreCalcObj = {
    attack: (value) => (value * 100) / personTemplate.attack,
    attack_percent: (value) => value,
    defense: (value) => (value * 100) / personTemplate.defense,
    defense_percent: (value) => value,
    life: (value) => (value * 100) / personTemplate.life,
    life_percent: (value) => value,
    speed: (value) => value * 2,
    crit_rate: (value) => (value * 8) / 5,
    crit_injury: (value) => (value * 8) / 7,
    effect_hit: (value) => value,
    effect_resistance: (value) => value,
  };

  return equipmentProperty.properties.map((property) => {
    return scoreCalcObj[property.code](property.value);
  }).reduce((acc, cur) => {
    return acc + cur;
  }, 0);
};

// 强化一次装备属性
export const enhanceOnce = (equipmentProperty: Equipment): Equipment => {
  const getEnhanceItem = () :EquipmentPropertyItem => {
    return randomSelect(equipmentProperty.properties);
  };

  const getRestEnhanceItem = (): EquipmentPropertyItem => {
    const existPropertyCode = equipmentProperty.properties.map((item) => item.code);
    const notExistPropertyCode = propertyArray.filter((code) => !existPropertyCode.includes(code));
    const enhanceCode = randomSelect(notExistPropertyCode);
    return {
      value: 0,
      code: enhanceCode,
      oneEnhancedValueArray: enhancedProbabilityOptions[enhanceCode],
    };
  };

  const getEnhanceValue = (equipmentPropertyItem: EquipmentPropertyItem): number => {
    const randomValue = Math.random();
    let restValue = randomValue;
    let index = 0;
    while (restValue >= 0 && equipmentPropertyItem.oneEnhancedValueArray[index] != null) {
      restValue -= equipmentPropertyItem.oneEnhancedValueArray[index].value;
      index += 1;
    }

    return equipmentPropertyItem.oneEnhancedValueArray[index - 1].value;
  };

  const enhanceItemOnce = (equipmentPropertyItem: EquipmentPropertyItem): EquipmentPropertyItem => {
    return {
      ...equipmentPropertyItem,
      value: equipmentPropertyItem.value + getEnhanceValue(equipmentPropertyItem),
    };
  };

  const shouldAddOneProperty = () => {
    return equipmentProperty.quality === 'hero' && equipmentProperty.enhancedLevel >= 9 && equipmentProperty.enhancedLevel < 12;
  };

  let enhanceItem: EquipmentPropertyItem;

  if (shouldAddOneProperty()) {
    enhanceItem = getRestEnhanceItem();

    return {
      ...equipmentProperty,
      properties: [
        ...equipmentProperty.properties,
        enhanceItemOnce(enhanceItem),
      ],
    };
  }

  enhanceItem = getEnhanceItem();

  return {
    ...equipmentProperty,
    enhancedLevel: equipmentProperty.enhancedLevel + 3,
    properties: equipmentProperty.properties.map((equipmentPropertyItem) => {
      if (equipmentPropertyItem.code === enhanceItem.code) {
        return enhanceItemOnce(equipmentPropertyItem);
      }

      return equipmentPropertyItem;
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
