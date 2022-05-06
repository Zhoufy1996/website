/* eslint-disable no-underscore-dangle */
/* eslint-disable no-restricted-globals */
declare global {
  interface Window {
    __WB_DISABLE_DEV_LOGS: boolean;
  }
}

self.__WB_DISABLE_DEV_LOGS = true;

export {};
