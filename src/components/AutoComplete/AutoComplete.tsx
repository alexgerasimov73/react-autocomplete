import { FC } from 'react';

import { Input } from '../Input';
import { Option } from './modules/Option';
import { Spinner } from '../Spinner';
import { NO_OPTIONS } from '../../constants';
import { useSelectEvents } from '../../hooks/useSelectEvents';

import './AutoComplete.css';

export interface AutoCompleteOption {
  key: string;
  label: string;
}

export interface AutoCompleteProps {
  options: AutoCompleteOption[];
  error?: string;
  isLoading?: boolean;
  placeholder?: string;
  onChange?: (key: AutoCompleteOption['key']) => void;
  onChangeFilter?: (filter: string) => void;
}

export const AutoComplete: FC<AutoCompleteProps> = ({
  options,
  error,
  isLoading,
  placeholder,
  onChange,
  onChangeFilter,
}) => {
  const [
    { selectedOption, searchValue, isOpened },
    { handleChangeInput, handleClickSelectOption, handleClickInput }
  ] = useSelectEvents({ options, onChange, onChangeFilter });

  const getLoader = isLoading ? (
    <div className='AutoComplete__spinner'>
      <Spinner />
    </div>
  ) : undefined;

  return (
    <div className='AutoComplete'>
      <div className='AutoComplete__input'>
        <Input
          loader={getLoader}
          placeholder={placeholder}
          value={searchValue ?? ''}
          onChange={handleChangeInput}
          onClick={handleClickInput}
        />
        {error && <p className='AutoComplete__error'>{error}</p>}
      </div>

      {isOpened && (
        <div className='AutoComplete__dropdown'>
          {options.length > 0 ? (
            options.map((option) => (
              <Option
                key={option.key}
                data={option}
                enteredCharacters={searchValue}
                isSelected={selectedOption === option.key}
                onClick={handleClickSelectOption}
              />
            ))
          ) : (
            <span className='AutoComplete__empty'>
              {NO_OPTIONS}
            </span>
          )}
        </div>
      )}
    </div>
  );
};
