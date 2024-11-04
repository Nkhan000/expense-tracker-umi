/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import styled from "styled-components";
import Button from "./Button";
import { useDispatch, useSelector } from "react-redux";
import { useContext } from "react";
import { TrackerContext } from "./TrackerContext";
import { removeItem } from "../Features/TrackerSlice";
import { ModalContext } from "./Modal/Modal";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.4rem;
  /* padding: 1rem 2rem; */
  width: 35rem;
`;

const StyledHeadDiv = styled.div`
  & span {
    font-size: 3.2rem;
    font-weight: 600;
    color: var(--color-grey-800);
  }
`;

const TextDiv = styled.div`
  margin-bottom: 0.2rem;
  span {
    color: var(--color-grey-800);
    font-size: 1.8rem;
  }
`;

const ButtonsDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
`;
function WarningWindow({ id }) {
  const { trackers } = useSelector((state) => state.trackers);
  const { selectedTracker } = useContext(TrackerContext);
  const { close: closeModal } = useContext(ModalContext);
  const dispatch = useDispatch();

  const currTracker = trackers.filter(
    (item) => item.name === selectedTracker
  )[0];

  const currTransaction = currTracker.transactions.filter(
    (item) => item._id === id
  )[0];

  console.log(currTransaction);

  function handleDelete() {
    dispatch(
      removeItem({
        trackerName: selectedTracker,
        itemId: id,
        type: currTransaction.type,
        amount: currTransaction.amount,
      })
    );

    closeModal();
  }
  return (
    <Container>
      <StyledHeadDiv>
        <span>WARNING</span>
      </StyledHeadDiv>
      <TextDiv>
        <span>Are your sure you want to delete the selected item ?</span>
      </TextDiv>
      <ButtonsDiv>
        <Button onClick={handleDelete} size="small" variation="danger">
          Delete
        </Button>
        <Button size="small" variation="secondary">
          Cancel
        </Button>
      </ButtonsDiv>
    </Container>
  );
}

export default WarningWindow;
