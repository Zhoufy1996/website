import { atom } from 'recoil';
import { v4 as uuidv4 } from 'uuid';
import { PersonTemplatePreset } from '../../types/epic7';
import { getLocalStorage } from '../../utils/localStorage';

export const getInitialPersonTemplate = ():PersonTemplatePreset => {
  return {
    id: uuidv4(),
    name: '默认模板',
    attack: '1000',
    defense: '500',
    life: '5000',
  };
};

const getInitialPersonTemplateList = (): PersonTemplatePreset[] => {
  const localData = getLocalStorage('personTemplateList');
  if (localData) {
    return JSON.parse(localData);
  }

  return [getInitialPersonTemplate()];
};

export const personTemplatePresetArrayState = atom<PersonTemplatePreset[]>({
  key: 'personTemplatePresetArrayState',
  default: getInitialPersonTemplateList(),
});

export const editTemplateModalVisibleState = atom<boolean>({
  key: 'editTemplateModalVisible',
  default: false,
});

export const editTemplateIdState = atom<string>({
  key: 'editTemplateIdState',
  default: '',
});
