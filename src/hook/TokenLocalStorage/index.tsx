import { useState, useEffect, Dispatch, SetStateAction } from 'react';

type TokenHook = [
  string | null,
  Dispatch<SetStateAction<string | null>>,
  () => void,
  () => string | null
];

const useAuthToken = (): TokenHook => {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    // Retrieve token from local storage on component mount
    const storedToken = localStorage.getItem('authToken');
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const saveToken: (newToken: SetStateAction<string | null>) => void = (newToken) => {
    // Save token to local storage
    localStorage.setItem('authToken', newToken as string);
    setToken(newToken);
  };

  const removeToken = () => {
    // Remove token from local storage
    localStorage.removeItem('authToken');
    setToken(null);
  };

  const getToken: () => string | null = () => {
    // Retrieve token from local storage
    const storedToken = localStorage.getItem('authToken');
    return storedToken;
  };

  return [token, saveToken, removeToken, getToken];
};

export default useAuthToken;
