import { Input, Spacer } from "@/styles";
import styled from "@emotion/styled";

export const HomeSection = Spacer.withComponent('section');

export const SearchContainer = styled.div`
  width: 100%;
  display:flex;
`;

export const SearchInput = styled(Input)`
  flex: 1;
`;

export const List = styled.div`
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

export const Badge = styled.span`
  border-radius: 0.5rem;
  background-color: #F5F8FA;
  font-weight: normal;
  padding: 0 0.4rem;
  margin-left: 0.8rem;
  border: 2px solid #D8DEE3;
`;