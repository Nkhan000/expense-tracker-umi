/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { createContext, useContext, useState } from "react";
import { createPortal } from "react-dom";
import styled, { css } from "styled-components";
import { useOutsideClick } from "../../hooks/useOutsideClick";
import { HiXMark } from "react-icons/hi2";

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: var(--backdrop-color);
  backdrop-filter: blur(4px);
  z-index: 1000;
  transition: all 0.5s;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const StyledModal = styled.div`
  position: relative;
  ${(props) =>
    props.bg === "light"
      ? css`
          background-color: var(--color-grey-50);
        `
      : css`
          background-color: var(--color-grey-900);
        `}
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-lg);
  padding: 3.2rem 4rem;
  transition: all 0.5s;
`;
const Button = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;
  position: absolute;
  top: 1.2rem;
  right: 1.9rem;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;

    color: var(--color-grey-500);
  }
`;

export const ModalContext = createContext();

const Modal = ({ children }) => {
  const [openName, setOpenName] = useState("");
  const open = setOpenName;
  const close = () => setOpenName("");
  return (
    <ModalContext.Provider value={{ open, openName, close }}>
      {children}
    </ModalContext.Provider>
  );
};

const Open = ({ name, children }) => {
  const { open } = useContext(ModalContext);
  const existingClick = children.props.onClick;
  function handleClick() {
    open(name);

    if (existingClick) {
      existingClick();
    }
  }
  return <div onClick={handleClick}>{children}</div>;
};

const ModalWindow = ({ name, children }) => {
  const { openName, close } = useContext(ModalContext);

  const ref = useOutsideClick(close);
  if (openName !== name) return null;

  return createPortal(
    <Overlay>
      <StyledModal bg="light" ref={ref}>
        <Button onClick={close}>
          <svg>
            <HiXMark />
          </svg>
        </Button>
        <div>{children}</div>
      </StyledModal>
    </Overlay>,
    document.body
  );
};

Modal.close = close;
Modal.Open = Open;
Modal.ModalWindow = ModalWindow;

export default Modal;
