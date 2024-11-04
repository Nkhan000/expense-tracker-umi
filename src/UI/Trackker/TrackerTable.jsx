/* eslint-disable no-unused-vars */
import styled from "styled-components";
import TrackerItem from "./TrackerTableItem";
import TrackerTabelHead from "./TrackerTableItemHead";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { useContext } from "react";
import { TrackerContext } from "../TrackerContext";
import { useSearchParams } from "react-router-dom";

const TrackerItemsDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding-bottom: 1rem;
  /* border-bottom: 1px solid var(--color-grey-300); */
`;
const TableContainer = styled.div`
  height: max-content;
  margin: 0 4rem;
  border-radius: 1rem;
  border-left: 1px solid var(--color-grey-300);
  border-right: 1px solid var(--color-grey-300);
  overflow: hidden;
`;

const NotFound = styled.div`
  grid-column: 1 /-1;
  padding: 1rem;
  text-align: center;

  & span {
    font-weight: 300;
    font-style: italic;
    font-size: 1.8rem;
  }
`;

function TrackerTable({ currTracker }) {
  const PAGE_SIZE = 3;
  const [searchParams, setSearchParams] = useSearchParams();
  const currPage = Number(searchParams.get("page"));

  return (
    <TableContainer>
      {currTracker?.transactions?.length > 0 && <TrackerTabelHead />}
      <>
        {currTracker?.transactions.length == 0 && (
          <NotFound>
            <span>No items Found</span>
          </NotFound>
        )}

        <TrackerItemsDiv>
          {currTracker?.transactions
            ?.slice((currPage - 1) * PAGE_SIZE, currPage * PAGE_SIZE)
            .map((item, idx) => (
              <TrackerItem item={item} number={idx} key={idx} />
            ))}
        </TrackerItemsDiv>
      </>
    </TableContainer>
  );
}

// props Validation
TrackerTable.propTypes = {
  currTracker: PropTypes.object,
};

export default TrackerTable;
