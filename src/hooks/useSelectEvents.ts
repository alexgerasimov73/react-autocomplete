import { ChangeEvent, useCallback, useState } from 'react';
import { onlySymbolsValidation } from '../utils/onlySymbolsValidation';
import { AutoCompleteOption, AutoCompleteProps } from '../components/AutoComplete/AutoComplete';

type Props = Readonly<Pick<AutoCompleteProps, 'options' | 'onChangeFilter'>>;

export const useSelectEvents = ({ options, onChangeFilter }: Props) => {
  const [isOpened, setIsOpened] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [selectedOption, setSelectedOption] = useState<Readonly<AutoCompleteOption['key']>>();

  const handleCloseDropdown = useCallback(() => setIsOpened(false), []);
  const handleOpenDropdown = useCallback(() => setIsOpened(true), []);

  const handleChangeInput = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;

      if (onlySymbolsValidation(value)) {
        setSearchValue(value);
        onChangeFilter(value);
      }
    },
    [onChangeFilter],
  );

  const handleCliickSelectOption = useCallback(
    (key: AutoCompleteOption['key']) => {
      setSelectedOption(key);
      setIsOpened(false);

      const currentOption = options.find((option) => option.key === key);
      setSearchValue(currentOption?.label ?? '');
    },
    [options],
  );

  return {
    isOpened,
    searchValue,
    selectedOption,
    handleChangeInput,
    handleCliickSelectOption,
    handleCloseDropdown,
    handleOpenDropdown,
  };
};
