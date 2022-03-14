 type PropertyCode = 'attack' | 'attack_percent' |
 'defense' | 'defense_percent' |
 'life' | 'life_percent' |
 'speed' | 'crit_rate' | 'crit_injury' |
 'effect_hit' | 'effect_resistance';

type Part = 'arms' | 'helmet' | 'clothing' | 'ring' | 'necklace' | 'shoe';

interface ProbabilityItem {
  part: Part;
  quality: 'legend' | 'hero';
  probabilities: {
    code: PropertyCode;
    probability: number
  }[]
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
  return [];
};

export default getEnhancedProbability;
