import { useCallback, useEffect, useState } from 'react';
import { AutoCompleteOption } from '../components/AutoComplete';
import { CITIES_API, ITEMS_LIMIT } from '../constants';
import { transformToCityOptions } from '../utils/transformToCityOptions';

export const useCities = () => {
  const [cities, setCities] = useState<AutoCompleteOption[]>([]);
  const [error, setError] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = useCallback(
    async (query?: string, limit: number = ITEMS_LIMIT) => {
      if (!error) {
        setError(undefined);
      }

      setIsLoading(true);

      await fetch(`${CITIES_API}?page=1&limit=${limit}&filter=${query ?? ''}`)
        .then((response) => response.json())
        .then((data) => setCities(transformToCityOptions(data)))
        .catch((err: Error) => {
          setError(err.message);
          console.error(err);
        })
        .finally(() => setIsLoading(false));
    },
    [error],
  );

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { cities, fetchData, error, isLoading };
};
