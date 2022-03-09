import deepClone from './components/js/utils/deepClone';

declare global {
  interface Window {
    deepClone: typeof deepClone
  }
}
