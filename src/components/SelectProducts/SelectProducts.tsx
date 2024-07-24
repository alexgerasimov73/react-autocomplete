import { AutoComplete } from '../AutoComplete/AutoComplete';
import { useDebounce } from '../../hooks/useDebounce';
import { useProducts } from '../../hooks/useProducts';
import { INPUT_PLACEHOLDER } from '../../constants';

export const SelectProducts = () => {
  const debounce = useDebounce();
  const { error, isLoading, products, fetchProducts } = useProducts();

  const refetchProducts = (query: string) => {
    debounce(() => fetchProducts(query));
  };

  return (
    <AutoComplete
      error={error}
      isLoading={isLoading}
      options={products}
      placeholder={INPUT_PLACEHOLDER}
      onChangeFilter={refetchProducts}
    />
  );
};
