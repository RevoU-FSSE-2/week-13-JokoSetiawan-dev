import { useState } from "react";

const useLocalStorageGet = (key: string, initialValue: any) => {
    // Get initial value from local storage or use provided initial value
    const storedValue = localStorage.getItem(key);
    const initial = storedValue ? JSON.parse(storedValue) : initialValue;
  
    // State to keep track of the current value
    const [value, setValue] = useState(initial);
  
    // Update local storage whenever the value changes
    const setStoredValue = (newValue: any) => {
      setValue(newValue);
      localStorage.setItem(key, JSON.stringify(newValue));
    };
  
    return [value, setStoredValue];
  };

  export default useLocalStorageGet;