import { PersonTemplatePreset } from '../types/epic7';
import { getInitialPersonTemplate } from './epic7';
import { getLocalStorage, setLocalStorage } from './localStorage';

export const initialLocalStorage = () => {
  let personTemplatesLocalData: PersonTemplatePreset[] = JSON.parse(getLocalStorage('personTemplates') || '[]');

  if (!Array.isArray(personTemplatesLocalData) || personTemplatesLocalData.length === 0) {
    setLocalStorage('personTemplates', JSON.stringify([getInitialPersonTemplate()]));
  }

  const selectedTemplateId = getLocalStorage('selectedTemplateId');

  personTemplatesLocalData = JSON.parse(getLocalStorage('personTemplates') || '[]');

  if (personTemplatesLocalData.find((item) => item.id === selectedTemplateId) == null) {
    setLocalStorage('selectedTemplateId', personTemplatesLocalData[0]?.id);
  }
};
