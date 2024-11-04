/* eslint-disable react/prop-types */
import styled, { css } from "styled-components";

import TrackerItemEditBtns from "./TrackerItemEditBtns";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  border-bottom: 1px solid var(--color-grey-300);
  /* margin-bottom: 0.8rem; */
`;

const ItemDetailsDiv = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 5rem 25rem 10rem 10rem 10rem 10rem 17rem;
  column-gap: 3rem;
  row-gap: 0.5rem;
  justify-content: space-between;
  align-items: center;
  text-align: center;
  padding: 0.5rem 0;
`;

const ItemDescriptionDiv = styled.div`
  padding: 0 1rem;
  padding-bottom: 0.4rem;
  grid-column: 2 / -1;
  text-align: left;

  & span {
    font-size: 1.2rem;
    color: var(--color-grey-700);
    font-style: italic;
  }
`;

const ItemNumDiv = styled.div`
  padding: 0 0 0 1rem;
  grid-row: 1 / 3;
  & span {
    color: var(--color-grey-400);
    font-weight: 600;
    font-size: 2.8rem;
  }
`;

const ItemNameDiv = styled.div`
  width: 100%;
  & span {
    color: var(--color-grey-700);
    font-size: 1.5rem;
  }
`;

const ItemCategoryDiv = styled.div`
  /* width: fit-content; */
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem 1rem;
  border-radius: 1rem;
  /* font-weight: 600; */
  font-size: 1.4rem;
  display: flex;
  align-items: center;

  ${(props) =>
    props.bgcolor === "expense" &&
    css`
      background-color: var(--color-yellow-700);
      color: var(--color-grey-100);
    `}
  ${(props) =>
    props.bgcolor === "loss" &&
    css`
      color: var(--color-grey-100);
      background-color: var(--color-red-700);
    `}
      ${(props) =>
    props.bgcolor === "profit" &&
    css`
      color: var(--color-grey-100);
      background-color: var(--color-green-700);
    `} /* color: var(--color-grey-50); */
`;
const ItemTypeDiv = styled.div`
  /* width: fit-content; */
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem 0;
  border-radius: 1rem;
  font-size: 1.4rem;
  display: flex;
  align-items: center;
  background-color: var(--color-brand-500);
  color: var(--color-grey-100);
  font-family: "kamala", cursive;
`;

const ItemPriceDiv = styled.div`
  & span {
    color: var(--color-grey-700);
    /* font-weight: 600; */
    font-size: 1.5rem;
  }
`;

const ItemDateDiv = styled.div`
  & span {
    color: var(--color-grey-700);
    /* font-weight: 600; */
    font-size: 1.5rem;
  }
`;

function TrackerItem({ item, number }) {
  const { name, amount, type, category, date, description, _id } = item;

  return (
    <Container>
      <ItemDetailsDiv>
        <ItemNumDiv>
          <span>{number < 10 ? `0${number + 1}` : `${number + 1}`}</span>
        </ItemNumDiv>
        <ItemNameDiv>
          <span>{name}</span>
        </ItemNameDiv>
        <ItemCategoryDiv bgcolor={type}>
          <span>{type}</span>
        </ItemCategoryDiv>
        <ItemTypeDiv>
          <span>{category}</span>
        </ItemTypeDiv>
        <ItemPriceDiv>
          <span>${Number(amount).toFixed(2)}</span>
        </ItemPriceDiv>
        <ItemDateDiv>
          {/* {console.log()} */}
          <span>{date}</span>
        </ItemDateDiv>
        <TrackerItemEditBtns id={_id} />
        <ItemDescriptionDiv>
          <span>Description : {description}</span>
        </ItemDescriptionDiv>
      </ItemDetailsDiv>
    </Container>
  );
}

export default TrackerItem;
