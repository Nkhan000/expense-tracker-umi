import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: center;
  border-top: 1px solid var(--color-brand-100);
  background-image: var(--blue-gradient-01);
  padding: 1rem;
`;

const CopywriteDiv = styled.div`
  span {
    width: 100%;
    height: 100%;
    font-size: 1.4rem;
    font-weight: 600;

    @media (max-width: 768px) {
      font-size: 1rem;
      line-height: 1;
    }
  }
`;

function Footer() {
  return (
    // <></>
    <Container>
      <CopywriteDiv>
        <span>
          ©ExTrack 2024. App was designed during the intership period of three
          months at UNIFIED MENTORS by NAZIR KHAN. All Rights reserved.
        </span>
      </CopywriteDiv>
    </Container>
  );
}

export default Footer;
