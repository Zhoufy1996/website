import { atom, selector } from 'recoil';
import { PersonTemplate } from '../../types/epic7';
import { getInitialPersonTemplate } from '../../utils/epic7';
import { localForageEffect } from '../effects/localEffect';

const defualtTemplate: PersonTemplate = { ...getInitialPersonTemplate(), name: 'xx', status: 'published' };

export const personTemplatesState = atom<PersonTemplate[]>({
  key: 'personTemplatesState',
  default: [defualtTemplate],
  effects_UNSTABLE: [localForageEffect('personTemplates', [defualtTemplate])],
});

export const selectedTemplateIdState = atom<string>({
  key: 'selectedTemplateIdState',
  default: defualtTemplate.id,
  effects_UNSTABLE: [localForageEffect('selectedTemplateId', defualtTemplate.id)],
});

export const selectedTemplateState = selector({
  key: 'selectedTemplateState',
  get: ({ get }) => {
    const selectedId = get(selectedTemplateIdState);
    return get(personTemplatesState).find((item) => item.id === selectedId);
  },
});

export const publishedTemplateState = selector({
  key: 'publishedTemplateState',
  get: ({ get }) => {
    return get(personTemplatesState).filter((item) => item.status === 'published');
  },
});
