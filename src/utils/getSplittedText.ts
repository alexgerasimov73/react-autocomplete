export const getSplittedText = (label: string, enteredLetters: string) => {
  const highlightRegExp = new RegExp(`(${enteredLetters})`, 'gi');
  return label.split(highlightRegExp);
};
