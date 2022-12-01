import { FC, useCallback, useMemo } from 'react';
import { AutoCompleteOption } from '../../AutoComplete';
import { getSplittedText } from '../../../../utils/getSplittedText';

import './Option.css';

interface OptionProps {
  data: AutoCompleteOption;
  enteredCharacters?: string;
  isSelected?: boolean;
  onClick?: (key: AutoCompleteOption['key']) => void;
}

export const Option: FC<OptionProps> = ({
  data,
  enteredCharacters,
  isSelected,
  onClick,
}) => {
  const { key, label } = data;

  const handleClickWrapper = useCallback(() => {
    onClick?.(key);
  }, [key, onClick]);

  const content = useMemo(() => {
    if (!enteredCharacters || enteredCharacters === label) {
      return label;
    }

    const splittedText = getSplittedText(label, enteredCharacters);

    return splittedText.map((textPart, index) => (
      <span
        key={`${textPart}_${index}`}
        className={textPart.toLowerCase() === enteredCharacters.toLowerCase() ? 'Option__enteredCharacters' : ''}
      >
        {textPart}
      </span>
    ));
  }, [enteredCharacters, label]);

  return (
    <div
      className={isSelected ? 'Option Option__selected' : 'Option'}
      onClick={handleClickWrapper}
    >
      {content}
    </div>
  );
};
