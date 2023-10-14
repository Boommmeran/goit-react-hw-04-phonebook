import styled from '@emotion/styled';

export const FilterContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
`;

export const FilterLabel = styled.label`
  display: block;
  font-weight: bold;
`;

export const FilterInput = styled.input`
  max-width: 300px;
  padding: 8px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;

  :focus {
  border-color: #007bff;
  outline: none;
  box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
}
`;