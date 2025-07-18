import { useState, useEffect, useCallback } from 'react';

const API_KEY_STORAGE_KEY = 'gemini-api-key';

export const useApiKey = () => {
  const [apiKey, setApiKey] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const storedKey = localStorage.getItem(API_KEY_STORAGE_KEY);
    if (storedKey) {
      setApiKey(storedKey);
    }
    setIsLoaded(true);
  }, []);

  const saveApiKey = useCallback((key: string) => {
    setApiKey(key);
    localStorage.setItem(API_KEY_STORAGE_KEY, key);
  }, []);

  const clearApiKey = useCallback(() => {
    setApiKey(null);
    localStorage.removeItem(API_KEY_STORAGE_KEY);
  }, []);

  return { apiKey, isLoaded, saveApiKey, clearApiKey };
};