import { getSplittedText } from '../../../../utils/getSplittedText';
import type { AutoCompleteOption } from '../../AutoComplete';
import './Option.css';

interface Props {
  readonly enteredLetters?: string;
  readonly isSelected?: boolean;
  readonly option: AutoCompleteOption;
  readonly onClick: (key: AutoCompleteOption['key']) => void;
}

export const Option = ({ enteredLetters, isSelected, option, onClick }: Props) => {
  const content = () => {
    if (!enteredLetters || enteredLetters === option.label) return option.label;

    const splittedText = getSplittedText(option.label, enteredLetters);

    return splittedText.map((textPart, index) => (
      <span
        key={`${textPart}-${index}`}
        className={
          textPart.toLowerCase() === enteredLetters.toLowerCase() ? 'Option-EnteredLetters' : ''
        }>
        {textPart}
      </span>
    ));
  };

  const handleClickWrapper = () => onClick(option.key);

  return (
    <div className={isSelected ? 'Option Option-Selected' : 'Option'} onClick={handleClickWrapper}>
      {content()}
    </div>
  );
};
