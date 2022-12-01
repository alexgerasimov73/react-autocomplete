export const getSplittedText = (label: string, enteredCharacters?: string): string[] => {
  const highlightRegExp = new RegExp(`(${enteredCharacters})`, 'gi');
  return label.split(highlightRegExp);;
};
