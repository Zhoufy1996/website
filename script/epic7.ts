 // https://page.onstove.com/epicseven/tw/view/7872400
 type PropertyCode = 'attack' | 'attack_percent' |
 'defense' | 'defense_percent' |
 'life' | 'life_percent' |
 'speed' | 'crit_rate' | 'crit_injury' |
 'effect_hit' | 'effect_resistance';

const propertyCode: PropertyCode[] = [
  'attack',
  'attack_percent',
  'defense',
  'defense_percent',
  'life',
  'life_percent',
  'speed',
  'effect_hit',
  'effect_resistance',
  'crit_rate',
  'crit_injury',
];

interface ProbabilityItem {
  quality: 'legend' | 'hero' | 'rare';
  level: '88' | '72-85' | '58-71';
  code: PropertyCode;
  probability: number
  value:number
}

const saveTemplateAsFile = (filename:string, dataObjToWrite:any) => {
  const blob = new Blob([JSON.stringify(dataObjToWrite)], { type: 'text/json' });
  const link = document.createElement('a');

  link.download = filename;
  link.href = window.URL.createObjectURL(blob);
  link.dataset.downloadurl = ['text/json', link.download, link.href].join(':');

  const evt = new MouseEvent('click', {
    view: window,
    bubbles: true,
    cancelable: true,
  });

  link.dispatchEvent(evt);
  link.remove();
};

const getEnhancedProbability = (): ProbabilityItem[] => {
  const getOne = (tableElement: Element, code:PropertyCode, level :ProbabilityItem['level']) => {
    const trArray = Array.from(tableElement.querySelectorAll('tr'));
    const trs = trArray.slice(2, trArray.length - 1);

    const result:ProbabilityItem[] = [];

    const temp:ProbabilityItem = {
      quality: 'legend',
      level,
      code,
      probability: 0,
      value: 0,
    };
    trs.forEach((tr, index) => {
      const tdArray = Array.from(tr.querySelectorAll('td'));
      const tds = tdArray.slice(index === 0 ? 1 : 0);
      tds.map((td) => td.innerHTML).forEach((str, i) => {
        if (i % 2 === 0) {
          temp.value = Number(str);
        } else {
          temp.probability = Number(str.replace('%', ''));
        }

        if (i === 0) {
          temp.quality = 'legend';
        } else if (i === 2) {
          temp.quality = 'hero';
        } else if (i === 4) {
          temp.quality = 'rare';
        }

        if (i % 2 === 1) {
          result.push({
            ...temp,
          });
        }
      });
    });

    return result;
  };

  const result:ProbabilityItem[] = [];

  const getLevel = (i:number):ProbabilityItem['level'] => {
    if (i < 11) {
      return '88';
    }

    if (i < 22) {
      return '72-85';
    }

    return '58-71';
  };

  const getCode = (i:number):PropertyCode => {
    return propertyCode[i % 11];
  };

  const tables = Array.from(document.querySelectorAll('table')).slice(3, 36);

  // 88 72-85 58-71
  // 攻击力 攻击力(%) 防御力 防御力(%) 生命力 生命力(%) 速度 效果命中 效果抗性 暴击率 暴击伤害

  tables.forEach((table, i) => {
    result.push(
      ...getOne(table, getCode(i), getLevel(i)),
    );
  });

  return result;
};

export default getEnhancedProbability;
