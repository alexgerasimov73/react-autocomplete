import { useRef } from 'react';
import { InputWithSpinner } from '../InputWithSpinner/InputWithSpinner';
import { useSelectEvents } from '../../hooks/useSelectEvents';
import { Option } from './modules/Option/Option';
import { useOutsideClick } from '../../hooks/useOutsideClick';
import { NOTHING_FOUND } from '../../constants';
import './AutoComplete.css';

export interface AutoCompleteOption {
  readonly key: string;
  readonly label: string;
}

export interface AutoCompleteProps {
  readonly error?: string;
  readonly isLoading?: boolean;
  readonly options: ReadonlyArray<AutoCompleteOption>;
  readonly placeholder?: string;
  readonly onChangeFilter: (filter: string) => void;
}

export const AutoComplete = ({
  error,
  isLoading,
  options,
  placeholder,
  onChangeFilter,
}: AutoCompleteProps) => {
  const {
    isOpened,
    searchValue,
    selectedOption,
    handleChangeInput,
    handleCliickSelectOption,
    handleCloseDropdown,
    handleOpenDropdown,
  } = useSelectEvents({ options, onChangeFilter });
  const ref = useRef<HTMLDivElement>(null);

  useOutsideClick({ elementRef: ref, enabled: isOpened, handler: handleCloseDropdown });

  return (
    <div className="AutoComplete" ref={ref}>
      <div>
        <InputWithSpinner
          isLoading={isLoading}
          placeholder={placeholder}
          value={searchValue}
          onChange={handleChangeInput}
          onFocus={handleOpenDropdown}
        />
        {error && <p className="AutoComplete-Error">{error}</p>}
      </div>

      {isOpened && (
        <div className="AutoCompleteInput-Dropdown">
          {options.length > 0 ? (
            options.map((option) => (
              <Option
                key={option.key}
                enteredLetters={searchValue}
                isSelected={selectedOption === option.key}
                option={option}
                onClick={handleCliickSelectOption}
              />
            ))
          ) : (
            <span className="AutoCompleteInput-Empty">{NOTHING_FOUND}</span>
          )}
        </div>
      )}
    </div>
  );
};
