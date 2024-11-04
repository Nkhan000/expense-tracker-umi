/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import styled from "styled-components";
import Button from "../Button";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { addNewTracker, updateTracker } from "../../Features/TrackerSlice";
import { useContext, useEffect, useState } from "react";
import { ModalContext } from "../Modal/Modal";
import { TrackerContext } from "../TrackerContext";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  width: 35rem;
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
  align-items: center;
  gap: 1.2rem;
  width: 100%;
`;

const InputDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;
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

const StyledLabel = styled.label`
  font-size: 1.4rem;
  font-weight: 600;
  color: var(--color-grey-700);
`;

const FormHead = styled.div``;

function AddNewTrackerForm({ name, monthName, type = "add" }) {
  const [oldName, setOldName] = useState(name);
  const [oldNameOfTheMonth, setOldNameOfTheMonth] = useState(monthName);

  const dispatch = useDispatch();
  const { close } = useContext(ModalContext);
  const { setName } = useContext(TrackerContext);

  const { register, handleSubmit, setValue } = useForm();

  useEffect(() => {
    setValue("name", name);
    setValue("nameOfTheMonth", monthName);
  }, [setValue, name, monthName]);

  function onSubmit(data) {
    if (oldName || oldNameOfTheMonth) {
      const updatedObj = {
        name: data.name,
        oldName,
        nameOfTheMonth: data.nameOfTheMonth,
        oldNameOfTheMonth,
      };
      dispatch(updateTracker(updatedObj));
      setName(data.name);
    } else {
      const trackerData = {
        ...data,
        transactions: [],
        totalProfit: 0,
        netTotal: 0,
        totalLoss: 0,
        totalExpense: 0,
      };
      dispatch(addNewTracker(trackerData));
      setName(data.name);
    }

    close();
  }

  return (
    <Container>
      <HeadDiv>
        <span>{type == "add" ? "Start new tracker" : "Edit tracker"}</span>
      </HeadDiv>
      <StyledForm onSubmit={handleSubmit(onSubmit)}>
        <InputDiv>
          <StyledLabel htmlFor="name">Name of the tracker</StyledLabel>
          <StyledInput
            id="name"
            type="text"
            placeholder="Name for your tracker"
            required
            {...register("name")}
          />
        </InputDiv>
        <InputDiv>
          <StyledLabel htmlFor="month">For the month of</StyledLabel>
          <StyledInput
            id="month"
            type="text"
            required
            placeholder="january. . . "
            {...register("nameOfTheMonth")}
          />
        </InputDiv>

        <Button size="medium" variation="primary" type="submit">
          Start
        </Button>
      </StyledForm>
    </Container>
  );
}

export default AddNewTrackerForm;
