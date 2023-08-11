import styled from "@emotion/styled";

export const LayoutContainer = styled.div`
  width: 100vw;
  min-height: 100vh;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto 1fr;
  gap: 0.8rem;
`;

export const LayouContent = styled.main`
  width: 100%;
  max-width: 1024px;
  margin: 0 auto;
  min-height: 100%;
  padding: 0.8rem;
`;