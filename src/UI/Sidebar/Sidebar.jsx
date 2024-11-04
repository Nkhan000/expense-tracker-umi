/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import styled from "styled-components";
import SidebarItem from "./SidebarItem";
import { useSelector } from "react-redux";

const Container = styled.div`
  background-color: var(--color-grey-50);
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    width: 12px; /* Set the width of the scrollbar */
    background-color: transparent; /* Make the background transparent */
  }

  ::-webkit-scrollbar-thumb {
    background-color: rgba(
      0,
      0,
      0,
      0.3
    ); /* Set the thumb to be semi-transparent */
    border-radius: 6px;
  }

  ::-webkit-scrollbar-track {
    background-color: transparent; /* Transparent track background */
  }
`;

const SidebarHead = styled.div`
  background-color: var(--color-brand-100);
  padding: 0.8rem 1rem;

  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  span {
    font-size: 2.2rem;
    font-weight: 600;
    color: var(--color-grey-700);
  }
`;

const SidebarItemDiv = styled.div`
  /* padding: 0 1rem; */
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

function Sidebar() {
  const trackers = useSelector((state) => state.trackers);
  const { trackers: trackerItems } = trackers;

  return (
    <Container>
      <SidebarHead>
        <span>Recent Trackers</span>
      </SidebarHead>
      <SidebarItemDiv>
        {trackerItems?.map((item, idx) => (
          <SidebarItem item={item} idx={idx} key={idx} />
        ))}
      </SidebarItemDiv>
    </Container>
  );
}

export default Sidebar;
