/* eslint-disable react/prop-types */
import { FaEdit } from "react-icons/fa";
import styled, { css } from "styled-components";

const AddNewDiv = styled.div`
  width: 100%;
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  cursor: pointer;
  text-transform: capitalize;

  &:hover {
    span {
      color: var(--color-grey-800);
    }

    div {
      /* background-color: var(--color-brand-700); */
    }
  }

  ${(props) =>
    props.size == "large" &&
    css`
      span {
        font-size: 1.8rem;
        color: var(--color-grey-500);
      }
    `}
  ${(props) =>
    props.size == "small" &&
    css`
      gap: 0.6rem;
      span {
        font-size: 1.5rem;
        color: var(--color-grey-500);
      }
    `}
`;

const AddBtnIcon = styled.div`
  width: 2.6rem;
  height: 2.6rem;
  padding: 0.5rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 2rem;
  font-weight: 600;
  ${(props) =>
    props.type === "add"
      ? css`
          color: var(--color-grey-100);
          background-color: var(--color-brand-500);
        `
      : css`
          padding: 0;
          color: var(--color-grey-900);
          background-color: var(--color-grey-100);
        `}
  /* svg {
    color: black;
  } */

  ${(props) =>
    props.size == "small" &&
    css`
      width: 2rem;
      height: 2rem;
      font-size: 1.4rem;
    `}
`;

function AddNewBtn({ type = "add", size = "large", text = "Add new Item" }) {
  return (
    <AddNewDiv size={size}>
      <AddBtnIcon type={type} size={size}>
        {type == "add" ? "+" : <FaEdit />}
        {/* <FaEdit /> */}
      </AddBtnIcon>
      <span>{text}</span>
    </AddNewDiv>
  );
}

export default AddNewBtn;
