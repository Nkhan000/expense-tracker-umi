/* eslint-disable no-unused-vars */
import styled, { css } from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  border-bottom: 1px solid var(--color-grey-300);
  margin-bottom: 0.8rem;
  background-color: var(--color-brand-100);
  border-radius: 1rem 1rem 0 0;
`;

const ItemDetailsDiv = styled.div`
  width: 100%;
  /* padding-bottom: 0.8rem; */

  display: grid;
  grid-template-columns: 5rem 25rem 10rem 10rem 10rem 10rem 17rem;
  gap: 3rem;
  justify-content: space-between;
  align-items: center;
  text-align: center;
  padding: 1rem 0;
  font-weight: 600;
`;

function TrackerTabelHead() {
  return (
    <Container>
      <ItemDetailsDiv>
        <span>S.no.</span>
        <span>Name of the transaction</span>
        <span>Type</span>
        <span>Category</span>
        <span>Amount</span>
        <span>Date</span>
        <span>Options</span>
      </ItemDetailsDiv>
    </Container>
  );
}

export default TrackerTabelHead;
