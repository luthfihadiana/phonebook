import styled from "@emotion/styled";

export const StyledHeader = styled.header`
  width: 100%;
  padding: 0.8rem;
  border-bottom: 1px solid #D8DEE3;
  background-color: #F5F8FA;
  padding: 0.8rem;
  min-height: 5.5rem;
`;

export const StyledContainer = styled.div`
  width: 100%;
  max-width: 1024px;
  margin: 0 auto;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const StyledSection = styled.div`
  display: flex;
  align-items: center;
  & > *:not(:last-child){
    margin-right: 0.8rem;
  }
`;

export const StyledLink = styled.a`
  cursor: pointer;
`;