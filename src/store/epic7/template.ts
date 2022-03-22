import { atom } from 'recoil';
import { PersonTemplatePreset } from '../../types/epic7';
import { getInitialPersonTemplateList } from '../../utils/epic7';

export const personTemplatePresetArrayState = atom<PersonTemplatePreset[]>({
  key: 'personTemplatePresetArrayState',
  default: getInitialPersonTemplateList(),
});

export const editTemplateIdState = atom<string>({
  key: 'editTemplateIdState',
  default: '',
});
