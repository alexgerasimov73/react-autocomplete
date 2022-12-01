import { useCallback, useState } from 'react';
import { AutoCompleteOption, AutoCompleteProps } from '../components/AutoComplete';
import { onlyLetterValidate } from '../utils/onlyLetterValidate';

export const useSelectEvents = (
  { options, onChange, onChangeFilter }: Pick<AutoCompleteProps, 'options' | 'onChange' | 'onChangeFilter'>
) => {
  const [isOpened, setIsOpened] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [selectedOption, setSelectedOption] = useState<AutoCompleteOption['key']>();

  const handleClickInput = useCallback(() => {
    setIsOpened(isOpened => !isOpened);
  }, []);

  const handleChangeInput = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (onlyLetterValidate(value)) {
      setSearchValue(value);
      onChangeFilter?.(value);
    }
  }, [onChangeFilter]);
  
  const handleClickSelectOption = useCallback((key: AutoCompleteOption['key']) => {
    onChange?.(key);
    setSelectedOption(key);
    setIsOpened(false);

    const originalOption = options.find((option) => option.key === key);
    setSearchValue(originalOption?.label ?? '');
  }, [onChange, options]);

  return [
    { selectedOption, searchValue, isOpened },
    { handleChangeInput, handleClickSelectOption, handleClickInput }
  ];
};
