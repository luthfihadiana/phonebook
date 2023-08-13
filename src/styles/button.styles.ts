import { ColorSchemeType } from "@/types";
import styled from "@emotion/styled";

type ButtonPropTypes = {
  colorScheme?: ColorSchemeType,
}

const Button = styled.button`
  all: unset;
  box-sizing: border-box;
  padding: 0.8rem 1.6rem;
  font-size: 1.4rem;
  background-color: ${({colorScheme}:ButtonPropTypes) => `var(--${colorScheme||'primary'})`};
  border-radius: 0.5rem;
  color: white;
  transition: 0.2s all ease-in;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover:not(:disabled){
    cursor: pointer;
    background-color: ${({colorScheme}:ButtonPropTypes) => `var(--${colorScheme||'primary'}_hover)`};
  }
  &:disabled{
    cursor: 'not-allowed';
    background-color: #D8DEE3;
  }
`;

export default Button;