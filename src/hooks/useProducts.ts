import { useCallback, useEffect, useState } from 'react';
import { transformToAutoCompleteOptions } from '../utils/transformToAutoCompleteOptions';
import { AutoCompleteOption } from '../components/AutoComplete/AutoComplete';
import { PRODUCTS_QUERY_URL, QUERY_ITEMS_LIMIT } from '../constants';

export const useProducts = () => {
  const [products, setProducts] = useState<ReadonlyArray<AutoCompleteOption>>([]);
  const [error, setError] = useState<string | undefined>();
  const [isLoading, setIsLoading] = useState(false);

  const fetchProducts = useCallback(
    async (query?: string, limit: number = QUERY_ITEMS_LIMIT) => {
      if (error) setError(undefined);
      setIsLoading(true);

      await fetch(`${PRODUCTS_QUERY_URL}search?q=${query ?? ''}&limit=${limit}`)
        .then((response) => response.json())
        .then((data) => setProducts(transformToAutoCompleteOptions(data.products)))
        .catch((err: Error) => {
          setError(err.message);
          console.error(err);
        })
        .finally(() => setIsLoading(false));
    },
    [error],
  );

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return { error, isLoading, products, fetchProducts };
};
