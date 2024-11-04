/* eslint-disable no-unused-vars */
import { useContext } from "react";
import styled, { css } from "styled-components";
import { TrackerContext } from "../TrackerContext";
import { useSelector } from "react-redux";

const Container = styled.div`
  background-color: var(--color-brand-100);
  padding: 1rem 6rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const DetailsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const DetailDiv = styled.div`
  display: flex;
  flex-direction: column;

  ${(props) =>
    props.type == "profit" &&
    css`
      color: var(--color-green-700);
    `}
  ${(props) =>
    props.type == "expense" &&
    css`
      color: var(--color-yellow-700);
    `}
  ${(props) =>
    props.type == "loss" &&
    css`
      color: var(--color-red-700);
    `}
`;

const DetailDivTextBg = styled.span`
  font-size: 2.2rem;
  font-weight: 600;
`;
const DetailDivTextSm = styled.span`
  font-size: 1.4rem;
  font-weight: 600;
`;

function TrackerBottom() {
  const { selectedTrackerObj } = useContext(TrackerContext);

  if (selectedTrackerObj == {} || !selectedTrackerObj) return null;
  const { totalProfit, totalLoss, totalExpense, netTotal } = selectedTrackerObj;
  return (
    <Container>
      <DetailsContainer>
        <DetailDiv type="profit">
          <DetailDivTextBg>${totalProfit?.toFixed(2)}</DetailDivTextBg>
          <DetailDivTextSm>In Profit</DetailDivTextSm>
        </DetailDiv>
        <DetailDiv type="expense">
          <DetailDivTextBg>${totalExpense?.toFixed(2)}</DetailDivTextBg>
          <DetailDivTextSm>In Expenses</DetailDivTextSm>
        </DetailDiv>
        <DetailDiv type="loss">
          <DetailDivTextBg>${totalLoss?.toFixed(2)}</DetailDivTextBg>
          <DetailDivTextSm>In Losses</DetailDivTextSm>
        </DetailDiv>
        <DetailDiv type={netTotal > 0 ? "profit" : "loss"}>
          <DetailDivTextBg>${netTotal?.toFixed(2)}</DetailDivTextBg>
          <DetailDivTextSm>Net Total</DetailDivTextSm>
        </DetailDiv>
      </DetailsContainer>
    </Container>
  );
}

export default TrackerBottom;
