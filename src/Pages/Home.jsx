/* eslint-disable no-unused-vars */
import styled, { css } from "styled-components";
import { Link } from "react-router-dom";
import AboutUs from "../UI/AboutUs.JSX";
import Button from "../UI/Button";
import { useRef } from "react";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
  /* padding: 2rem; */
`;

const HeroSection = styled.div`
  overflow-x: hidden;
  width: 100vw;
  background-image: var(--blue-gradient-01);
  padding: 4rem 2rem;

  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  min-height: 80vh;
  align-items: center;

  @media (min-width: 768px) {
    padding: 6rem 5rem;
    grid-template-columns: 1fr 1fr;
  }

  @media (min-width: 1200px) {
    padding: 8rem 15rem;
  }
`;

const FirstDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3rem;
  /* width: 80%; */

  @media (min-width: 768px) {
    gap: 6rem;
  }
`;

const SecondDiv = styled.div`
  position: relative;
`;

const ImageDiv = styled.div`
  height: auto;
  width: 100%;
  scale: 1;
  padding-bottom: 2rem;
  display: none;

  @media (min-width: 768px) {
    width: 50rem;
    scale: 1.2;
    padding-bottom: 5rem;
    display: block;
  }

  @media (min-width: 1200px) {
    width: 60rem;
  }
`;

const StyledImg = styled.img`
  height: 100%;
  width: 100%;
`;

const GradientBallsDiv = styled.div`
  display: flex;
  gap: 0.5rem;
  position: relative;

  @media (min-width: 768px) {
    gap: 1rem;
  }
`;

const GradientBallSm = styled.div`
  height: 2rem;
  width: 2rem;

  ${(props) =>
    props.bgcolor === "green" &&
    css`
      background-color: var(--color-green-700);
    `}
  ${(props) =>
    props.bgcolor === "red" &&
    css`
      background-color: var(--color-red-700);
    `}
  ${(props) =>
    props.bgcolor === "yellow" &&
    css`
      background-color: var(--color-yellow-700);
    `}
  filter: contrast(1.5);
  border-radius: 50%;

  @media (min-width: 768px) {
    height: 2rem;
    width: 2rem;
  }
`;

const TextDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;

  @media (min-width: 460px) {
    gap: 0.6rem;
  }
  @media (min-width: 768px) {
    gap: 0.6rem;
  }
`;

const TextHeadBg = styled.span`
  font-size: 3.5rem;
  font-weight: 600;

  @media (min-width: 460px) {
    font-size: 3rem;
  }
  @media (min-width: 768px) {
    font-size: 3.5rem;
  }
`;

const TextHeadSm = styled.span`
  font-size: 1.6rem;
  line-height: 2;
  width: 85%;

  @media (min-width: 460px) {
    font-size: 1.4rem;
    line-height: 2.2;
    width: 75%;
  }

  @media (min-width: 768px) {
    font-size: 1.6rem;
    line-height: 2;
    width: 100%;
  }
`;

const TextBold = styled.span`
  font-family: "kamala", cursive;
  font-weight: 700;
`;

const BtnsDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;

  @media (min-width: 768px) {
    gap: 3rem;
  }
`;
// second div

function Home() {
  const sectionRef = useRef(null);

  const scrollToSection = () => {
    sectionRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
  };
  return (
    <Container>
      <HeroSection>
        <FirstDiv>
          <GradientBallsDiv>
            <GradientBallSm bgcolor="green" />
            <GradientBallSm bgcolor="red" />
            <GradientBallSm bgcolor="yellow" />
          </GradientBallsDiv>

          <TextDiv>
            <TextHeadBg>Track your expenses on the go.</TextHeadBg>
            <TextHeadSm>
              Welcome to <TextBold>ExTrack</TextBold> — your smart finance tool!
              Track expenses, set payment reminders, and reduce unnecessary
              spending to boost your savings. Let <TextBold>ExTrack </TextBold>{" "}
              help your money grow and guide you toward a wealthier future!
            </TextHeadSm>
          </TextDiv>

          <BtnsDiv>
            <Link to="/tracker">
              <Button size="medium" variation="primary">
                Start Tracking
              </Button>
            </Link>
            <Button
              size="medium"
              variation="secondary"
              onClick={scrollToSection}
            >
              What we offer ?
            </Button>
          </BtnsDiv>
        </FirstDiv>
        <SecondDiv>
          <ImageDiv>
            <StyledImg src="./img/treemoney.png" />
          </ImageDiv>
        </SecondDiv>
      </HeroSection>

      <AboutUs sectionRef={sectionRef} />
    </Container>
  );
}

export default Home;
