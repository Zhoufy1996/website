import { v4 as uuidv4 } from 'uuid';

import { PersonTemplatePreset } from '../types/epic7';
import { getLocalStorage, setLocalStorage } from './localStorage';

export const initialLocalStorage = () => {
  let personTemplatesLocalData: PersonTemplatePreset[] = JSON.parse(getLocalStorage('personTemplates') || '[]');

  if (!Array.isArray(personTemplatesLocalData) || personTemplatesLocalData.length === 0) {
    const getInitialPersonTemplate = ():PersonTemplatePreset => {
      return {
        id: uuidv4(),
        name: '默认模板',
        attack: '1000',
        defense: '500',
        life: '5000',
      };
    };
    setLocalStorage('personTemplates', JSON.stringify([getInitialPersonTemplate()]));
  }

  const selectedTemplateId = getLocalStorage('selectedTemplateId');

  personTemplatesLocalData = JSON.parse(getLocalStorage('personTemplates') || '[]');

  if (personTemplatesLocalData.find((item) => item.id === selectedTemplateId) == null) {
    setLocalStorage('selectedTemplateId', personTemplatesLocalData[0]?.id);
  }
};
