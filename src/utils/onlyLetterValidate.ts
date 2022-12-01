export const onlyLetterValidate = (value: string): boolean => {
  return /^[a-zA-Z ]*$/g.test(value);
};
