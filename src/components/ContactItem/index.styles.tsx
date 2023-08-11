import styled from "@emotion/styled";

export const ContactItem = styled.div`
  display:grid;
  width: 100%;
  grid-template-columns: auto 1fr auto;
  gap: 0.8rem;
  align-items: center;
`;

export const ContactImage = styled.img`
  width: 50px;
  height: auto;
  border-radius: 50%;
`;

export const ContactNumber = styled.p`
  color: grey;
`;