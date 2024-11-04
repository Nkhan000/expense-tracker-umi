import { CiWavePulse1 } from "react-icons/ci";
import { Link } from "react-router-dom";

import styled from "styled-components";

const Container = styled.header`
  width: 100vw;
  background-image: var(--blue-gradient-01);
  display: grid;
  grid-template-columns: 1fr 80% 1fr;
  align-items: center;
  justify-items: center;
  gap: 2rem;
  padding: 1rem 3rem;
  border-bottom: 1px solid var(--color-brand-100);

  @media (max-width: 1200px) {
    grid-template-columns: 1fr 70% 1fr;
    padding: 1rem 2rem;
  }

  @media (max-width: 992px) {
    grid-template-columns: 1fr 60% 1fr;
    padding: 1rem 1.5rem;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr 60%;
    padding: 1rem;

    text-align: center;
  }
`;

const StyledSvg = styled.svg`
  width: 5rem;
  height: 5rem;
  font-size: 5rem;

  @media (max-width: 768px) {
  }
`;

const LogoDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  @media (max-width: 768px) {
    justify-content: center; /* Center logo on mobile */
    /* gap: 0; */
  }
`;

const LogoText = styled.span`
  font-size: 3rem;
  color: var(--color-grey-900);
  font-family: "Kalam", cursive;
  font-weight: 700;

  @media (max-width: 768px) {
    font-size: 2rem; /* Responsive font size */
  }
`;

const NavDiv = styled.nav`
  @media (max-width: 768px) {
    width: 100%; /* Full width on mobile */
    justify-self: center; /* Center navigation */
  }
`;

const NavLinksDiv = styled.ul`
  display: flex;
  align-items: center;
  gap: 3rem;

  @media (max-width: 768px) {
    /* flex-direction: column; Stack navigation links on mobile */
    gap: 1.5rem; /* Adjust gap for stacked items */

    justify-content: center;
  }

  li {
    /* font-size: 1.1rem; */
    color: var(--color-grey-800);
    font-weight: 600;
    position: relative;

    &::before {
      content: "";
      width: 0;
      height: 3px;
      background-color: var(--color-brand-500);
      position: absolute;
      top: 100%;
      left: 0;
      transition: width 0.2s ease-in;
    }

    &:hover {
      &::before {
        width: 100%; /* Underline effect on hover */
      }
    }

    @media (max-width: 768px) {
      font-size: 1.2rem; /* Responsive font size */
    }
  }
`;

function Header() {
  return (
    <Container>
      <Link to="/">
        <LogoDiv>
          <StyledSvg>
            <CiWavePulse1 />
          </StyledSvg>
          <LogoText>ExTrack</LogoText>
        </LogoDiv>
      </Link>
      <NavDiv>
        <NavLinksDiv>
          <li>
            <Link to="/">HOME</Link>
          </li>
          <li>
            <Link to="/tracker">TRACKER</Link>
          </li>
        </NavLinksDiv>
      </NavDiv>
    </Container>
  );
}

export default Header;
