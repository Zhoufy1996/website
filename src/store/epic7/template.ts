import { atom } from 'recoil';
import { PersonTemplatePreset } from '../../types/epic7';

export const personTemplatePresetArrayState = atom<PersonTemplatePreset[]>({
  key: 'personTemplatePresetArrayState',
  default: [],
});

export const editTemplateIdState = atom<string>({
  key: 'editTemplateIdState',
  default: '',
});
