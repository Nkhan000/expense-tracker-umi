/* eslint-disable react/prop-types */
import styled, { css } from "styled-components";
import { HiOutlineCurrencyDollar } from "react-icons/hi";
import { FaHandHoldingDollar } from "react-icons/fa6";
import { TbClockDollar } from "react-icons/tb";
import { RiToolsFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import Button from "./Button";
// import Button from "./Button";

const Container = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  /* padding: 2rem; Add padding for better spacing on all screens */

  @media (max-width: 768px) {
    /* padding: 1rem; Reduce padding on smaller screens */
  }
`;

const SectionMain = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-image: var(--blue-gradient-01);
  border-top: 1px solid var(--color-brand-100);
  padding: 3rem;

  @media (max-width: 768px) {
    padding: 2rem;
  }

  @media (max-width: 480px) {
    padding: 1rem;
  }
`;

const SectionCTA = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;
  background-image: var(--blue-gradient-01);
  padding: 2rem 0;

  @media (max-width: 768px) {
    padding: 2rem; /* Reduce padding */
  }
`;

const SectionHeadDiv = styled.div`
  padding: 4rem;

  @media (max-width: 768px) {
    padding: 2rem; /* Less padding on smaller screens */
    text-align: center; /* Center text on mobile */
  }

  span {
    font-size: 5rem;
    font-family: "kamala", cursive;
    font-weight: 600;

    @media (max-width: 768px) {
      font-size: 5rem; /* Adjust font size for mobile */
    }

    @media (max-width: 480px) {
      font-size: 4rem; /* Further reduce font size for extra small screens */
    }
  }
`;

const SectionIconsDiv = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 5rem;
  padding: 1.5rem 5rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    padding: 0.8rem;

    /* padding: 1rem; */
  }
`;

const IconDiv = styled.div`
  display: grid;
  grid-template-columns: min-content 1fr;
  /* align-items: center; */
  gap: 3rem;
  justify-content: center;

  @media (max-width: 768px) {
    gap: 1rem; /* Reduce gap for smaller screens */
    grid-column: 1/1;
  }
`;

const IconTextDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  @media (max-width: 768px) {
    align-items: center; /* Center text on mobile */
  }
`;

const IconTextBg = styled.div`
  font-size: 2.5rem;
  font-weight: 600;

  @media (max-width: 768px) {
    font-size: 2rem; /* Adjust font size for mobile */
  }
`;

const IconTextSm = styled.div`
  font-size: 1.4rem;

  @media (max-width: 768px) {
    font-size: 1.2rem; /* Smaller font size for mobile */
  }
`;

const StyledIconBg = styled.div`
  svg {
    font-size: 6.5rem;
    color: var(--color-grey-200);

    @media (max-width: 768px) {
      font-size: 3rem; /* Adjust SVG size for mobile */
    }

    @media (max-width: 480px) {
      font-size: 3rem; /* Further reduce SVG size for extra small screens */
    }
  }
`;

const IconBall = styled.div`
  height: 13rem;
  width: 13rem;
  border-radius: 50%;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.5s;

  border: 6px solid var(--color-brand-200);

  ${(props) =>
    props.bgcolor === "green" &&
    css`
      background-color: #12cf28;
    `}
  ${(props) =>
    props.bgcolor === "red" &&
    css`
      background-color: #e74123;
    `}
  ${(props) =>
    props.bgcolor === "yellow" &&
    css`
      background-color: #b8e01b;
    `}
  ${(props) =>
    props.bgcolor === "blue" &&
    css`
      background-color: #1ba5e0;
    `}

  &:hover {
    cursor: pointer;
    scale: 1.2;
  }

  ${(props) =>
    props.bgcolor === "none" &&
    css`
      background-color: transparent;
      text-align: center;

      &:hover {
        cursor: pointer;
        background-color: var(--color-grey-100);
        scale: 1.2;
      }
    `}

  @media (max-width : 768px) {
    height: 7rem;
    width: 7rem;
  }
`;

function AboutUs({ sectionRef }) {
  return (
    <Container ref={sectionRef}>
      <SectionMain>
        <SectionHeadDiv>
          <span>What We Offer </span>
        </SectionHeadDiv>
        <SectionIconsDiv>
          <IconDiv>
            <IconBall bgcolor="green">
              <StyledIconBg>
                <HiOutlineCurrencyDollar />
              </StyledIconBg>
            </IconBall>
            <IconTextDiv>
              <IconTextBg>Money Growth Assistance</IconTextBg>
              <IconTextSm>
                Get actionable insights to reduce unnecessary expenses and grow
                your savings.
              </IconTextSm>
            </IconTextDiv>
          </IconDiv>
          <IconDiv>
            <IconBall bgcolor="red">
              <StyledIconBg>
                <FaHandHoldingDollar />
              </StyledIconBg>
            </IconBall>
            <IconTextDiv>
              <IconTextBg>Expense Tracking & Reference :</IconTextBg>
              <IconTextSm>
                Easily log and save your expenses for future reference and
                better financial planning.
              </IconTextSm>
            </IconTextDiv>
          </IconDiv>
          <IconDiv>
            <IconBall bgcolor="yellow">
              <StyledIconBg>
                <TbClockDollar />
              </StyledIconBg>
            </IconBall>
            <IconTextDiv>
              <IconTextBg>Comprehensive Monthly Insights:</IconTextBg>
              <IconTextSm>
                Track all your income and spending throughout the month with
                clear, organized reports.
              </IconTextSm>
            </IconTextDiv>
          </IconDiv>
          <IconDiv>
            <IconBall bgcolor="blue">
              <StyledIconBg>
                <RiToolsFill />
              </StyledIconBg>
            </IconBall>
            <IconTextDiv>
              <IconTextBg>Sophistacated Tools You need :</IconTextBg>
              <IconTextSm>
                Use our sophisticated tools to calculate expenses for both your
                personal and business needs with ease and precision
              </IconTextSm>
            </IconTextDiv>
          </IconDiv>
        </SectionIconsDiv>
      </SectionMain>
      <SectionCTA>
        <Link to="/tracker">
          {/* <CtaButtonTwo>Start Tracking expenses</CtaButtonTwo> */}
          <Button size="medium" variation="primary">
            Start tracking expenses now !
          </Button>
        </Link>
      </SectionCTA>
    </Container>
  );
}

export default AboutUs;
