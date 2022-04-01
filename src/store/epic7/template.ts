import { atom, selector } from 'recoil';
import { PersonTemplatePreset } from '../../types/epic7';

export const personTemplatePresetArrayState = atom<PersonTemplatePreset[]>({
  key: 'personTemplatePresetArrayState',
  default: [],
});

export const editTemplateIdState = atom<string>({
  key: 'editTemplateIdState',
  default: '',
});

export const searchedTextState = atom<string>({
  key: 'searchedTextState',
  default: '',
});

export const searchedTemplatesState = selector({
  key: 'searchedTemplateState',
  get: ({ get }) => {
    const searchedText = get(searchedTextState);
    return get(personTemplatePresetArrayState).filter((item) => item.name.includes(searchedText));
  },
});
