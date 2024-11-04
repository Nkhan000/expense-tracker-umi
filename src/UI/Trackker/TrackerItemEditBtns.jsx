/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { FiEdit3 } from "react-icons/fi";
import { MdOutlineDelete } from "react-icons/md";
import styled, { css } from "styled-components";
import Modal from "../Modal/Modal";
import AddNewItemForm from "./AddNewItemForm";
import { useSelector } from "react-redux";
import WarningWindow from "../WarningWindow";

const ItemOperationDiv = styled.div`
  width: 100%;
  display: flex;
  gap: 1rem;
  color: var(--color-grey-700);
  justify-content: center;

  & span {
    font-size: 1.5rem;
  }
  & svg {
    height: 2rem;
    width: 2rem;
    font-size: 1.8rem;
    background-color: transparent;
  }
`;

const OpBtn = styled.button`
  display: flex;
  align-items: center;
  gap: 1rem;
  overflow: hidden;
  border: none;
  outline: 1px solid var(--color-grey-700);
  padding: 0.5rem 0.5rem;
  background-color: var(--color-grey-50);
  border-radius: 0.5rem;

  &:hover {
    ${(props) =>
      props.type === "delete" &&
      css`
        background-color: #ef5d5d;

        & span {
          color: var(--color-grey-100);
        }
        & svg {
          color: var(--color-grey-100);
        }
      `}
    ${(props) =>
      props.type === "edit" &&
      css`
        background-color: #5d89ef;

        & span {
          color: var(--color-grey-100);
        }
        & svg {
          color: var(--color-grey-100);
        }
      `}
  }
`;

function TrackerItemEditBtns({ id }) {
  return (
    <ItemOperationDiv>
      <Modal>
        <Modal.Open name="delete-item">
          <OpBtn type="delete">
            <svg>
              <MdOutlineDelete />
            </svg>{" "}
          </OpBtn>
        </Modal.Open>
        <Modal.ModalWindow name="delete-item">
          <WarningWindow id={id} />
        </Modal.ModalWindow>
      </Modal>
      <Modal>
        <Modal.Open name="edit-item">
          <OpBtn type="edit">
            <svg>
              <FiEdit3 />
            </svg>
          </OpBtn>
        </Modal.Open>
        <Modal.ModalWindow name="edit-item">
          <AddNewItemForm id={id} />
        </Modal.ModalWindow>
      </Modal>
    </ItemOperationDiv>
  );
}

export default TrackerItemEditBtns;
