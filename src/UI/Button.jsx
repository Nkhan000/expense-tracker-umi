import styled, { css } from "styled-components";

const Button = styled.button`
  outline: none;
  border: 1px solid;
  width: fit-content;
  font-weight: 600;
  font-family: inherit;
  border-radius: 1rem;
  ${(props) =>
    props.size === "small" &&
    css`
      font-size: 1.4rem;
      width: auto;
      padding: 0.6rem 1.5rem;
    `};
  ${(props) =>
    props.size === "medium" &&
    css`
      font-size: 1.7rem;
      padding: 1rem 3rem;
      border-radius: 1rem;
    `};
  ${(props) =>
    props.size === "large" &&
    css`
      font-size: 2rem;
      padding: 2rem 4rem;
    `};

  ${(props) =>
    props.variation === "primary" &&
    css`
      background-color: var(--color-brand-800);
      outline: 1px solid var(--color-brand-50);
      color: var(--color-grey-50);

      &:hover {
        background-color: var(--color-brand-500);
      }
    `};
  ${(props) =>
    props.variation === "secondary" &&
    css`
      background-color: transparent;
      outline: 1px solid var(--color-brand-800);
      color: var(--color-grey-800);
      transition: all 0.2s ease-in;

      &:hover {
        background-color: var(--color-brand-500);
        outline: 1px solid var(--color-brand-200);
        color: var(--color-grey-100);
      }
    `};
  ${(props) =>
    props.variation === "tertiary" &&
    css`
      font-size: 2rem;
      height: 2rem;
      padding: 2rem;
    `};
  ${(props) =>
    props.variation === "danger" &&
    css`
      transition: all 0.2s ease-in;
      outline: 2px solid var(--color-grey-200);
      background-color: var(--color-red-700);
      color: var(--color-grey-100);

      &:hover {
        outline: 2px solid var(--color-red-800);
      }
    `};
`;

export default Button;
