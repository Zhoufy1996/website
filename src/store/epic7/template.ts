import { atom } from 'recoil';
import { PersonTemplate } from '../../types/epic7';
import { localForageEffect } from '../effects/localEffect';

export const personTemplatesState = atom<PersonTemplate[]>({
  key: 'personTemplatesState',
  default: [],
  effects_UNSTABLE: [localForageEffect('personTemplates')],
});
