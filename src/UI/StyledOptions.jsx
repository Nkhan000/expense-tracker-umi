import styled from "styled-components";

const StyledOptions = styled.div`
  /* outline: 1px solid var(--color-brand-500); */
  border-radius: 1rem;
  overflow: hidden;
  border: none;

  display: flex;
  align-items: center;
  gap: 1rem;
  select {
    font-size: 1.2rem;
    outline: 1px solid var(--color-brand-500);
    padding: 0.5rem 1rem;
    border-radius: 1rem;
  }
  /* padding: 0.5rem; */
  option {
    padding: 0.5rem 1rem;
    font-size: 1.2rem;
  }
`;

export default StyledOptions;
