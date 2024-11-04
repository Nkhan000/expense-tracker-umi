/* eslint-disable no-unused-vars */
import styled from "styled-components";
// import StyledOptions from "../UI/StyledOptions";
// import TrackerItem from "../UI/Trackker/TrackerTableItem";
import TrackerHead from "../UI/Trackker/TrackerHead";
import TrackerTable from "../UI/Trackker/TrackerTable";
import Modal from "../UI/Modal/Modal";
import AddNewTrackerForm from "../UI/Trackker/AddNewTrackerForm";
import Sidebar from "../UI/Sidebar/Sidebar";
import Pagination from "../UI/Trackker/Pagination";
import TrackerBottom from "../UI/Trackker/TrackerBottom";
import AddNewBtn from "../UI/AddNewBtn";
import Button from "../UI/Button";
import AddNewItemForm from "../UI/Trackker/AddNewItemForm";
import { useSelector } from "react-redux";
import { useContext, useEffect, useLayoutEffect, useRef } from "react";
import { TrackerContext } from "../UI/TrackerContext";
import { useSearchParams } from "react-router-dom";

const Container = styled.div`
  min-height: 100vh;
  background-image: var(--blue-gradient-01);

  display: grid;
  grid-template-columns: 1fr;
  justify-content: center;
  padding: 1rem;

  @media (min-width: 768px) {
    grid-template-columns: 30rem 1fr;
  }
`;

const MainDiv = styled.main`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;

  @media (min-width: 768px) {
    padding: 1.2rem 3rem;
    align-items: flex-end;
  }
`;

const TrackerContainer = styled.div`
  position: relative;
  min-height: 60vh;
  background-color: var(--color-grey-100);
  border-radius: 2rem;
  box-shadow: 0.5rem 0.2rem 2rem var(--color-grey-400);
  overflow: hidden;
  width: 100%;
  max-width: 100%;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 1.5rem;
  padding: 1.5rem;

  @media (min-width: 768px) {
    min-height: 50%;
    border-radius: 3rem;
    gap: 2rem;
    padding: 2rem;
  }
`;

const DateDiv = styled.div`
  position: absolute;
  top: 1%;
  right: 5%;
  span {
    font-size: 0.9rem;
    font-style: italic;
    font-weight: 500;
  }

  @media (min-width: 768px) {
    right: 2%;
    span {
      font-size: 1.1rem;
    }
  }
`;

const TrackerBtnDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
  padding: 0 2rem;
  padding-bottom: 1rem;

  @media (min-width: 768px) {
    justify-content: flex-end;
    gap: 2rem;
    padding: 0 4rem;
  }
`;

function Tracker() {
  const { trackers } = useSelector((state) => state.trackers);
  const [searchParams, setSearchParams] = useSearchParams();

  const { selectedTracker, removeName, setObj, removeObj } =
    useContext(TrackerContext);

  const currTracker = trackers?.find((item) => item.name === selectedTracker);

  setObj(currTracker);

  const modifiedDate = new Date(currTracker?.lastModified).toLocaleDateString();
  const modifiedTime = new Date(currTracker?.lastModified)
    .toLocaleTimeString()
    .split(":")
    .join(" : ");

  let filteredCurrTracker = {
    ...currTracker,
    transactions: currTracker?.transactions
      .filter((item) =>
        searchParams.get("type") === "all"
          ? item
          : item.type === searchParams.get("type")
      )
      .filter((item) =>
        searchParams.get("category") === "all"
          ? item
          : item.category === searchParams.get("category")
      )
      .sort((a, b) => {
        const sortBy = searchParams.get("sortby");
        if (sortBy == "lowest") {
          return a.amount - b.amount;
        }
        if (sortBy == "highest") {
          return b.amount - a.amount;
        }
        if (sortBy == "oldest") {
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        }
        if (sortBy == "recent") {
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        }
      }),
  };

  return (
    <Container>
      <Sidebar />
      <MainDiv>
        {!currTracker && (
          <Modal>
            <Modal.Open name="add-new-tracker">
              <AddNewBtn text="add new tracker" size="large" />
            </Modal.Open>
            <Modal.ModalWindow name="add-new-tracker">
              <AddNewTrackerForm />
            </Modal.ModalWindow>
          </Modal>
        )}
        {currTracker && (
          <Button
            onClick={() => {
              removeName();
              removeObj();
            }}
            size="small"
            variation="primary"
          >
            close
          </Button>
        )}
        {selectedTracker && (
          <>
            <TrackerContainer>
              <DateDiv>
                <span>
                  Last updated : {modifiedDate} {"  "} ({modifiedTime})
                </span>
              </DateDiv>

              <TrackerHead />
              <TrackerTable currTracker={filteredCurrTracker} />

              <TrackerBtnDiv>
                <Modal>
                  <Modal.Open name="add-new-item">
                    <Button size="small" variation="primary">
                      Add new item
                    </Button>
                  </Modal.Open>
                  <Modal.ModalWindow name="add-new-item">
                    <AddNewItemForm />
                  </Modal.ModalWindow>
                </Modal>
                <Button size="small" variation="primary">
                  save
                </Button>
              </TrackerBtnDiv>

              {currTracker?.transactions.length > 0 && <TrackerBottom />}
            </TrackerContainer>

            {currTracker?.transactions.length > 0 && (
              <Pagination currTracker={filteredCurrTracker} />
            )}
          </>
        )}
      </MainDiv>
    </Container>
  );
}

export default Tracker;
