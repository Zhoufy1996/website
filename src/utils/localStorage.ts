const catchMap = new Map<string, string>();

export const setLocalStorage = (key: string, value:string) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(key, value);
  } else {
    catchMap.set(key, value);
  }
};

export const getLocalStorage = (key:string) => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem(key);
  }
  return catchMap.get(key);
};
