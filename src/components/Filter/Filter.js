import { FilterContainer, FilterLabel, FilterInput } from './Filter.styled';

export const Filter = ({ value, onChange }) => {
  return (
    <FilterContainer>
      <FilterLabel htmlFor="filter">Find contact by name</FilterLabel>
      <FilterInput type="text" id="filter" value={value} onChange={onChange} />
    </FilterContainer>
  );
};