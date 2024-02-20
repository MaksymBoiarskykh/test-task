import { AxiosError } from 'axios';
import { useEffect, useState } from 'react';

export const useFetch = (callback: () => void) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>();

  const fetchData = async () => {
    try {
      setIsLoading(true);
      await callback();
    } catch (error) {
      setError((error as AxiosError).message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return [isLoading, error];
};
