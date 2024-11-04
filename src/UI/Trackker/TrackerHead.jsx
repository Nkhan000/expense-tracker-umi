/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import styled from "styled-components";
import StyledOptions from "../StyledOptions";
import AddNewBtn from "../AddNewBtn";
import Modal from "../Modal/Modal";
// import AddNewItemForm from "./AddNewItemForm";
import AddNewTrackerForm from "./AddNewTrackerForm";
import { useContext, useEffect, useState } from "react";
import { TrackerContext } from "../TrackerContext";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
const TrackerHeadDiv = styled.div`
  padding: 4rem;
  padding-bottom: 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 2rem;
`;

const TrackerHeadLeftDiv = styled.div`
  display: grid;
  grid-template-columns: 1fr min-content;
  align-items: end;
  column-gap: 1rem;
  /* justify-content: center; */
`;

const TrackerHeadTextDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
`;

const TrackerHeadBg = styled.span`
  font-size: 2.6rem;
  font-weight: 600;
  color: var(--color-grey-700);
  text-transform: capitalize;
`;
const TrackerHeadSm = styled.span`
  font-size: 1.2rem;
  font-weight: 600;
  text-transform: capitalize;
  color: var(--color-grey-700);
`;

const FilterDiv = styled.div`
  display: flex;

  /* align-items: baseline; */
  gap: 1rem;
`;

const OptionsLable = styled.span`
  font-size: 1.4rem;
  color: var(--color-grey-800);
`;
function TrackerHead() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedType, setSelectedType] = useState("all");
  const [selectedSortBy, setSelectedSortBy] = useState("recent");
  const [searchParams, setSearchParams] = useSearchParams();

  const { selectedTrackerObj } = useContext(TrackerContext);

  let categoriesArr = [];
  console.log(selectedTrackerObj);
  selectedTrackerObj?.transactions.map(
    (item) =>
      !categoriesArr.includes(item.category) &&
      categoriesArr.push(item.category)
  );

  useEffect(() => {
    const URLParams = new URLSearchParams(searchParams);

    // Set default values only if parameters are missing
    URLParams.set("type", selectedType);
    URLParams.set("sortby", selectedSortBy);
    URLParams.set("category", selectedCategory);

    setSearchParams(URLParams);
  }, [
    searchParams,
    setSearchParams,
    selectedType,
    selectedCategory,
    selectedSortBy,
  ]);

  function handleChange(value, func) {
    const URLParams = new URLSearchParams(searchParams);
    URLParams.set("page", 1);
    setSearchParams(URLParams);

    func(value);
  }
  if (selectedTrackerObj == {} || !selectedTrackerObj) return null;
  return (
    <TrackerHeadDiv>
      <TrackerHeadLeftDiv>
        <TrackerHeadTextDiv>
          <TrackerHeadSm>
            In the Month of {selectedTrackerObj.nameOfTheMonth}
          </TrackerHeadSm>
          <TrackerHeadBg>{selectedTrackerObj.name}</TrackerHeadBg>
        </TrackerHeadTextDiv>

        <Modal>
          <Modal.Open name="add-new-item">
            <AddNewBtn type="edit" text="edit" size="small" />
          </Modal.Open>
          <Modal.ModalWindow name="add-new-item">
            <AddNewTrackerForm
              name={selectedTrackerObj.name}
              monthName={selectedTrackerObj.nameOfTheMonth}
              type={selectedTrackerObj.name?.length > 0 ? "edit" : "add"}
            />
          </Modal.ModalWindow>
        </Modal>
      </TrackerHeadLeftDiv>

      <FilterDiv>
        <StyledOptions>
          <OptionsLable>Types : </OptionsLable>
          <select
            value={selectedType}
            onChange={(e) => {
              handleChange(e.target.value, setSelectedType);
            }}
          >
            <option disabled>Select Type</option>
            <option value="all">All</option>
            <option value="expense">Expenses</option>
            <option value="loss">Losses</option>
            <option value="profit">Profits</option>
          </select>
        </StyledOptions>
        <StyledOptions>
          <OptionsLable>Categories : </OptionsLable>
          <select
            value={selectedCategory}
            onChange={(e) => {
              handleChange(e.target.value, setSelectedCategory);
            }}
          >
            <option disabled>Select category</option>
            <option value="all">All</option>
            {categoriesArr.map((item, idx) => (
              <option key={idx} value={item}>
                {item}
              </option>
            ))}
          </select>
        </StyledOptions>
        <StyledOptions>
          <OptionsLable>Sort by : </OptionsLable>
          <select
            value={selectedSortBy}
            onChange={(e) => {
              handleChange(e.target.value, setSelectedSortBy);
            }}
          >
            <option disabled>Select Order</option>
            <option value="recent">Most recent</option>
            <option value="oldest">Oldest</option>
            <option value="lowest">Lowest First</option>
            <option value="highest">Highest First</option>
          </select>
        </StyledOptions>
      </FilterDiv>
    </TrackerHeadDiv>
  );
}

export default TrackerHead;
