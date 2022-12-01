import { useCallback } from 'react';

import { AutoComplete } from '../AutoComplete';
import { useCities } from '../../hooks/useCities';
import { useDebounce } from '../../hooks/useDebounce';
import { SEARCH_CITY } from '../../constants';

export const SelectCities = () => {
  const debounce = useDebounce();
  const { cities, fetchData, isLoading, error } = useCities();

  const refetchCities = useCallback(
    (query: string) => {
      debounce(() => fetchData(query));
    },
    [debounce, fetchData],
  );

  return (
    <AutoComplete
      options={cities}
      error={error}
      isLoading={isLoading}
      placeholder={SEARCH_CITY}
      onChangeFilter={refetchCities}
    />
  );
};
