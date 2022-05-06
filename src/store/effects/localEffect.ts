import localforage from 'localforage';
import { AtomEffect, DefaultValue } from 'recoil';
import { LocalKeys } from '../../constants/localKeys';

export const localForageEffect: <T>(key: LocalKeys) => AtomEffect<T> =
  <T>(key: string) =>
  ({ onSet, setSelf }) => {
    const asyncLoadValue = async () => {
      const savedValue = await localforage.getItem<T>(key);
      if (savedValue != null) {
        setSelf(savedValue as any);
      }
    };

    asyncLoadValue();

    onSet((newValue) => {
      if (newValue instanceof DefaultValue) {
        localforage.removeItem(key);
      } else {
        localforage.setItem(key, newValue);
      }
    });
  };
