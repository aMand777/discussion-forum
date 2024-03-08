export const setAccessToken = (key: string, value: string) => {
  localStorage.setItem(key, value);
};

export const removeAccessToken = (key: string) => {
  localStorage.removeItem(key);
};
