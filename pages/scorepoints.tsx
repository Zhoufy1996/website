import PageContainer from '../components/pagecontainer';

type IncrementRange = number[];

interface BaseItem {
  label: string
  code: string
  incrementRange: IncrementRange
  calc: (num: number) => number
}

interface EquipmentPropertyItem {
  baseItem: BaseItem
  value: number
}

const calcOnePropertyScore = ({ baseItem, value }: EquipmentPropertyItem) => {
  return baseItem.calc(value);
};

interface PersonTemplate {
  attack: number
  defense: number
  vitality: number
}

const defaultTemplate: PersonTemplate = {
  attack: 1000,
  defense: 500,
  vitality: 5000,
};

const range = (start:number, end:number) => {
  return new Array(end - start + 1).fill(0).map((_, index) => {
    return start + index;
  });
};

const fields: BaseItem[] = [
  {
    label: '生命(%)',
    code: '',
    calc: (n) => n,
    incrementRange: range(4, 8),
  },
  {
    label: '防御(%)',
    code: '',
    calc: (n) => n,
    incrementRange: range(4, 8),
  },
  {
    label: '攻击(%)',
    code: '',
    calc: (n) => n,
    incrementRange: range(4, 8),
  },
  {
    label: '速度(%)',
    code: '',
    calc: (n) => n * 2,
    incrementRange: range(2, 4),
  },
  {
    label: '暴击(%)',
    code: '',
    calc: (n) => (n * 8) / 5,
    incrementRange: range(3, 5),
  },
  {
    label: '暴伤(%)',
    code: '',
    calc: (n) => (n * 8) / 7,
    incrementRange: range(4, 7),
  },
  {
    label: '生命',
    code: '',
    calc: (n, b = defaultTemplate.vitality) => (n / b) * 100,
    incrementRange: range(4, 7),
  },
  {
    label: '防御',
    code: '',
    calc: (n, b = defaultTemplate.defense) => (n / b) * 100,
    incrementRange: range(4, 7),
  },
  {
    label: '攻击',
    code: '',
    calc: (n, b = defaultTemplate.attack) => (n / b) * 100,
    incrementRange: range(4, 7),
  },
];

const calcScore = () => {

};

/**
 * 数值模板
 * 当前装备数值
 * 有效属性
 * 当前+几
 * 计算分数
 *  每跳加属性
 *  +15 最大分
 *  +15 最小分
 *  +15 均分
 */
const ScorePointsPage = () => {
  return (
    <PageContainer />
  );
};

export default ScorePointsPage;
