import { atom } from 'recoil';
import { v4 as uuidv4 } from 'uuid';
import { PersonTemplatePreset } from '../../types/epic7';

export const getInitialPersonTemplate = ():PersonTemplatePreset => {
  return {
    id: uuidv4(),
    name: '默认模板',
    attack: '1000',
    defense: '500',
    life: '5000',
  };
};

export const personTemplatePresetArrayState = atom<PersonTemplatePreset[]>({
  key: 'personTemplatePresetArrayState',
  default: [getInitialPersonTemplate()],
});
