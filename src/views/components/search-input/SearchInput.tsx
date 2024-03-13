import { InputHTMLAttributes } from 'react';

import SearchIcon from '@/src/assets/searchIcon.svg?react';

import './search-input.css';

interface SearchInputProps
  extends Partial<InputHTMLAttributes<HTMLInputElement>> {
  name: string;
  value?: string;
  placeholder: string;
  searchResultsLegend?: string;
}

const SearchInput: React.FC<SearchInputProps> = ({
  name,
  value,
  placeholder,
  searchResultsLegend,
  ...rest
}) => {
  return (
    <>
      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
      <label htmlFor={name}>
        <SearchIcon />
      </label>
      <input
        type="search"
        id={name}
        name={name}
        defaultValue={value || ''}
        placeholder={placeholder || 'Search'}
        {...rest}
      />
      {searchResultsLegend && <span>{searchResultsLegend}</span>}
    </>
  );
};

export default SearchInput;
