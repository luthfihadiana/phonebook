import styled from "@emotion/styled";

export const StyledList = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.2rem;
  margin-bottom: 3.5rem;
  @media (min-width:767px){
    grid-template-columns: repeat(2,1fr);
  }
  @media (min-width:1023px){
    grid-template-columns: repeat(3,1fr);
  }
`;

export const Centered = styled.div`
  width: 100%;
  height: 5rem;
  display: grid;
  place-items: center;
`;


export const EmptyText = styled.p`
  font-size: 3.2rem;
  color: grey;
`;
