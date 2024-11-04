/* eslint-disable react/prop-types */
import { useContext } from "react";
import styled from "styled-components";
import { TrackerContext } from "../TrackerContext";
import { useDispatch } from "react-redux";
import { removeTracker } from "../../Features/TrackerSlice";

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 1.2rem;
  padding: 1rem 1.2rem;
  transition: all 0.2s ease-in;

  &:hover {
    background-color: var(--color-brand-100);
    cursor: pointer;

    & > div button {
      visibility: visible;
    }
  }
`;

const ItemNum = styled.div`
  span {
    font-size: 1.4rem;
    color: var(--color-grey-500);
    font-weight: 600;
  }
`;

const ItemName = styled.div`
  margin-right: auto;
  span {
    font-size: 1.4rem;
    text-transform: capitalize;
    color: var(--color-grey-800);
    font-weight: 600;
  }
`;

const IconDiv = styled.div`
  display: flex;
  align-items: center;

  & button {
    font-size: 1rem;
    font-weight: 600;
    font-family: "kamala", cursive;
    border: none;

    /* background-color: var(--color-red-100); */
    background-color: #e44545;
    color: var(--color-grey-100);
    padding: 0.15rem 0.5rem;
    border-radius: 0.5rem;

    visibility: hidden;
  }
`;

function SidebarItem({ item, idx }) {
  const { removeName, selectedTracker, setName } = useContext(TrackerContext);
  const dispatch = useDispatch();
  function handleRemove(e) {
    e.stopPropagation();
    const obj = {
      itemName: item.name,
    };
    if (selectedTracker === item.name) {
      removeName();
    }
    dispatch(removeTracker(obj));
  }
  function handleClick() {
    setName(item.name);
  }
  return (
    <Container onClick={handleClick}>
      <ItemNum>
        <span>{idx + 1 < 10 ? `0${idx + 1}` : `${idx + 1}`}</span>
      </ItemNum>
      <ItemName>
        <span>{item.name}</span>
      </ItemName>

      <IconDiv>
        <button onClick={handleRemove}>X</button>
      </IconDiv>
    </Container>
  );
}

export default SidebarItem;
