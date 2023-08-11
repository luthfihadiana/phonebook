import styled from "@emotion/styled";

const Input = styled.input`
  all: unset;
  box-sizing: border-box;
  border: 0.1rem solid #D8DEE3;
  padding: 0.8rem 1.6rem;
  border-radius: 0.5rem;
  transition: 0.25s box-shadow ease-in;
  font-size: 1.4rem;
  &:focus{
    outline: none;
    box-shadow: 2px 2px 6px #D8DEE3;
  }
`;

export default Input;