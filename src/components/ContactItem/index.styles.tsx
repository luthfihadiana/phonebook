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

export const ContactTitle = styled.h3`
  text-transform: capitalize;
  max-width: 15rem;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;

export const ContactBadge = styled.span`
  background-color: grey;
  color: white;
  padding: 0 0.4rem;
  border-radius: 5px;
`;