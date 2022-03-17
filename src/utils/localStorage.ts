const catchMap = new Map<string, string>();

export const setLocalStorage = (key: string, value:string) => {
  if (window != null) {
    localStorage.setItem(key, value);
  } else {
    catchMap.set(key, value);
  }
};

export const getLocalStorage = (key:string) => {
  if (window != null) {
    localStorage.getItem(key);
  } else {
    catchMap.get(key);
  }
};
