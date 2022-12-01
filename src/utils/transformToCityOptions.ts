import { AutoCompleteOption } from '../components/AutoComplete';

interface CityItem {
  id: string;
  city: string;
}

export const transformToCityOptions = (data: CityItem[]): AutoCompleteOption[] => {
  return data.map(({ id, city }) => ({
    key: id,
    label: city,
  }));
};
