import { Input, Spacer } from "@/styles";
import styled from "@emotion/styled";

export const AddContactSection = Spacer.withComponent('section');

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

export const SubmitButtonContainer = styled.div`
  position: fixed;
  bottom: 0;
  width: 100vw;
  left: 0;
  background-color: white;
`;

export const SubmitButtonContent = styled.div`
  width: 100%;
  max-width: 1024px;
  margin: 0 auto;
  > button{
    width: 100%;
  }
  padding: 0.8rem;
`;