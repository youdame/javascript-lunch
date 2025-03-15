export function getLocalStorage<T>(key: string, defaultValue: T): T {
  const storedData = localStorage.getItem(key);
  return storedData ? JSON.parse(storedData) : defaultValue;
}

export function setLocalStorage<T>(key: string, value: T) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function removeItemFromLocalStorage<T>(key: string, filterFn: (item: T) => boolean) {
  const storedData = getLocalStorage<T[]>(key, []);
  const updatedData = storedData.filter(filterFn);
  setLocalStorage(key, updatedData);
}
