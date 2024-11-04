/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import styled, { css } from "styled-components";
import Button from "../Button";
import { useSelector } from "react-redux";
import { useContext, useEffect } from "react";
import { TrackerContext } from "../TrackerContext";
import { useSearchParams } from "react-router-dom";

const Container = styled.div`
  width: fit-content;
  height: 4rem;
  align-self: flex-end;
  display: flex;
  margin-right: 3.5rem;
  gap: 4rem;
`;

const ButtonDiv = styled.div``;

const PaginationNumberDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
`;

const PaginationNumber = styled.span`
  color: var(--color-grey-100);
  position: relative;
  font-weight: 600;
  font-size: 1.3rem;
  z-index: 1;
  cursor: pointer;

  &::before {
    content: "";
    z-index: -1;
    position: absolute;
    height: 2.5rem;
    width: 2.5rem;
    ${(props) =>
      props.isactive == "isactive" &&
      css`
        background-color: var(--color-brand-700);
      `}
    border-radius: 50%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  &:hover {
    &::before {
      background-color: var(--color-brand-700);
      cursor: pointer;
    }
  }
`;

function Pagination({ currTracker }) {
  const PAGE_SIZE = 3;
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const URLParams = new URLSearchParams();
    if (!searchParams.get("page")) {
      URLParams.set("page", 1);
      setSearchParams(URLParams);
    }
  }, [searchParams, setSearchParams]);

  // const currTracker = trackers.filter(
  //   (item) => item.name === selectedTracker
  // )[0];

  const numberOfPages = Math.ceil(currTracker.transactions.length / PAGE_SIZE);
  function handleNextPage() {
    const URLParams = new URLSearchParams();
    const currPage = Number(searchParams.get("page"));
    if (currPage + 1 <= numberOfPages) {
      URLParams.set("page", currPage + 1);
    }
    setSearchParams(URLParams);
  }
  function handlePrevPage() {
    const URLParams = new URLSearchParams();
    const currPage = Number(searchParams.get("page"));
    if (currPage - 1 >= 1) {
      URLParams.set("page", currPage - 1);
    }
    setSearchParams(URLParams);
  }
  return (
    <Container>
      <Button size="small" variation="primary" onClick={handlePrevPage}>
        {"<-"} Prev
      </Button>
      <PaginationNumberDiv>
        {Array.from({ length: numberOfPages }).map((_, idx) => (
          <PaginationNumber
            key={idx + 4}
            isactive={
              searchParams.get("page") === String(idx + 1)
                ? "isactive"
                : "notisactive"
            }
          >
            {idx + 1 < 10 ? `0${idx + 1}` : `${idx + 1}`}
          </PaginationNumber>
        ))}
      </PaginationNumberDiv>
      <Button size="small" variation="primary" onClick={handleNextPage}>
        Next {"->"}
      </Button>
    </Container>
  );
}

export default Pagination;
