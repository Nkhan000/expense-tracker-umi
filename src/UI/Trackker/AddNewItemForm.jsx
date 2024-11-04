/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import styled, { css } from "styled-components";
import Button from "../Button";
import StyledOptions from "../StyledOptions";
import { useForm } from "react-hook-form";
import { useContext, useEffect, useState } from "react";
import { TrackerContext } from "../TrackerContext";
import { useDispatch, useSelector } from "react-redux";
import { addNewItem, updateItem } from "../../Features/TrackerSlice";
import { ModalContext } from "../Modal/Modal";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  width: 55rem;
  height: 50rem;
  /* overflow-y: scroll; */
`;

const HeadDiv = styled.div`
  color: transparent;
  background-clip: text;
  background-image: var(--blue-gradient-02);
  span {
    font-size: 2.5rem;
    font-weight: 600;
    text-transform: capitalize;
    /* background-color: transparent; */
  }
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  width: 100%;
  overflow-y: scroll;
  /* overflow: hidden; */
`;

const InputDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  ${(props) =>
    props.direction === "row" &&
    css`
      flex-direction: row;
      align-items: center;
      gap: 1rem;
    `}

  &::placeholder {
    font-size: 1rem;
    font-style: italic;
  }
`;

const StyledInput = styled.input`
  font-size: 1.5rem;
  font-family: inherit;
  padding: 0.5rem 1rem;
  color: var(--color-grey-800);
  border-radius: 1rem;
  border: 1px solid var(--color-brand-500);
  /* font-weight: 600; */

  &:active,
  &:focus {
    outline: 1px solid var(--color-brand-500);
    border: 1px solid var(--color-brand-500);
  }
`;
const StyledTextarea = styled.textarea`
  font-size: 1.5rem;
  font-family: inherit;
  padding: 0.5rem 1rem;
  color: var(--color-grey-800);
  border-radius: 1rem;
  border: 1px solid var(--color-brand-500);
  width: 100%;
  height: 15rem;
  /* font-weight: 600; */

  &:active,
  &:focus {
    outline: 1px solid var(--color-brand-700);
    border: 1px solid var(--color-brand-700);
  }
`;

const StyledLabel = styled.label`
  font-size: 1.4rem;
  font-weight: 600;
  color: var(--color-grey-700);
`;

const ButtonDiv = styled.div`
  align-self: center;
`;

function AddNewItemForm({ id, type = "add" }) {
  const { selectedTracker, selectedTrackerObj } = useContext(TrackerContext);
  const { close: closeModal } = useContext(ModalContext);

  const dispatch = useDispatch();

  const [selectedType, setSelectedType] = useState("expense");
  const { register, handleSubmit, setValue } = useForm();

  // for updating the tracker
  const currTransaction = selectedTrackerObj.transactions.filter(
    (item) => item._id === id
  )[0];

  useEffect(() => {
    if (currTransaction) {
      setValue("transactionName", currTransaction.name);
      setValue("category", currTransaction.category);
      setValue("date", currTransaction.date);
      setValue("amount", currTransaction.amount);
      setValue("description", currTransaction.description);
      setSelectedType(currTransaction.type);
    }
  }, [currTransaction, setSelectedType, setValue]);

  function onSubmit(data) {
    const newItemObj = {
      ...data,
      trackerName: selectedTracker,
      type: selectedType,
    };
    if (id && currTransaction) {
      dispatch(
        updateItem({
          ...newItemObj,
          prevType: currTransaction.type,
          prevAmt: currTransaction.amount,
          transactionId: id,
        })
      );
    } else {
      dispatch(addNewItem(newItemObj));
    }

    closeModal();
  }

  // for date input
  const today = new Date().toISOString().split("T")[0];

  return (
    <Container>
      <HeadDiv>
        <span>{type === "add" ? "Add A new Item" : "Edit Tracker"}</span>
      </HeadDiv>
      <StyledForm onSubmit={handleSubmit(onSubmit)}>
        <InputDiv>
          <StyledLabel htmlFor="name">Name</StyledLabel>
          <StyledInput
            id="name"
            type="text"
            placeholder="eg : Sold my watch"
            {...register("transactionName")}
          />
        </InputDiv>
        <InputDiv>
          <StyledLabel htmlFor="category">Category : </StyledLabel>
          <StyledInput
            id="category"
            type="text"
            placeholder="food, transportation, . . . "
            {...register("category")}
          />
        </InputDiv>
        <InputDiv>
          <StyledLabel htmlFor="amount">Amount : </StyledLabel>
          <StyledInput
            id="amount"
            type="number"
            placeholder="amount for the transaction . . . "
            min={0}
            max={500000}
            {...register("amount")}
          />
        </InputDiv>
        <InputDiv>
          <StyledLabel htmlFor="date">Date : </StyledLabel>
          <StyledInput
            id="date"
            type="date"
            placeholder="amount for the transaction . . . "
            max={today}
            required
            {...register("date")}
          />
        </InputDiv>
        <InputDiv>
          <StyledLabel htmlFor="description">Description : </StyledLabel>
          <StyledTextarea
            id="description"
            placeholder="sold my watch at 300 profit to my friend . . . "
            max={115}
            {...register("description")}
          />
        </InputDiv>
        <InputDiv direction="row">
          <StyledLabel htmlFor="type">Type : </StyledLabel>
          <StyledOptions>
            <select
              id="type"
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
            >
              <option value="expense">Expense</option>
              <option value="profit">Profit</option>
              <option value="loss">Loss</option>
            </select>
          </StyledOptions>
        </InputDiv>

        <ButtonDiv>
          <Button size="medium" variation="primary" type="submit">
            Add
          </Button>
        </ButtonDiv>
      </StyledForm>
    </Container>
  );
}

export default AddNewItemForm;
