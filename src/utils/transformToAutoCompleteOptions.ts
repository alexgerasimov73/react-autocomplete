import { AutoCompleteOption } from '../components/AutoComplete/AutoComplete';

interface Item {
  readonly id: string;
  readonly title: string;
}

export const transformToAutoCompleteOptions = (
  data: ReadonlyArray<Item>,
): ReadonlyArray<AutoCompleteOption> =>
  data.map(({ id, title }) => ({
    key: id,
    label: title,
  }));
