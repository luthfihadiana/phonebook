import styled from "@emotion/styled";

export const PaginationContainer = styled.div`
  width: 100%;
  display: grid;
  place-items: center;
`;

export const PaginationItem = styled.div`
  width: 100%;
  max-width: 24rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Page = styled.span`
  font-size: 1.4rem;
  font-weight: bold;
`;

export const PaginationButton = styled.button`
  all: unset;
  font-size: 1.4rem;
  &:disabled{
    color: #D8DEE3;
  }
`;