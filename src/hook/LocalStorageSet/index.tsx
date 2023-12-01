import { useCallback } from "react";


const useLocalStorageSetter = () => {
  // Function to set a value in local storage
  const setLocalStorageValue = useCallback((key: string, value: any) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Error setting local storage:', error);
    }
  }, []);

  return setLocalStorageValue;
};

export default useLocalStorageSetter
