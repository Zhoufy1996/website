import localforage from 'localforage';
import { AtomEffect, DefaultValue } from 'recoil';
import { LocalKeys } from '../../constants';

export const localForageEffect: <T>(key: LocalKeys, defaultValue: T) => AtomEffect<T> =
  <T>(key: string, defaultValue: T) =>
  ({ onSet, setSelf }) => {
    const asyncLoadValue = async () => {
      const savedValue = await localforage.getItem<T>(key);
      if (savedValue != null) {
        setSelf(savedValue as any);
      } else {
        localforage.setItem(key, defaultValue);
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
