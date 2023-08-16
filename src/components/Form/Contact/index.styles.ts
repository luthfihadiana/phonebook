import { Button, Input, Spacer } from "@/styles";
import styled from "@emotion/styled";

export const InputNameContainers = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.6rem;
  @media (min-width:767px){
    grid-template-columns: repeat(2,1fr);
  }
`;

export const StyledInput = styled(Input)`
  width: 100%;
`;

export const AddNumberContainer = styled.div`
  display:flex;
  justify-content: flex-end;
`;

export const PhoneNumberInputContainer = styled(Spacer)`
  align-items: center;
`;

export const SubmitButton = styled(Button)`
  width: 100%;
`