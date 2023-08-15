import { Spacer } from "@/styles";
import styled from "@emotion/styled";

type ModalBackdropProp = {
  hide: boolean,
};

export const ModalBackdrop = styled.div`
${({hide}:ModalBackdropProp)=> hide && `
    display: none;
    z-index: -1;
    opacity: 0;
  ` || `
    opacity: 1;
    z-index: 1400;
    display: flex;
  `}
  position: fixed;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0,0,0,0.5);
  top: 50%;
  left: 50%;
  display: grid;
  place-items: center;
  animation: all 0.2s;
  transform: translate(-50%, -50%);
`;

export const ModalContainer = styled.div`
  width: 80%;
  min-width: 300px;
  max-width: 768px;
  background-color: white;
  border-radius: 1rem;
  border: 2px solid #D8DEE3;
  position: relative;
  padding: 0.8rem;
`;

export const ModalContent = styled.div`
  padding: 0.8rem;
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 0.8rem;
`;

export const ModalTitle = styled.h1`
  font-size: 2rem;
  font-weight: bold;
`;

export const ModalCancelButton = styled.span`
  font-size: large;
  cursor: pointer;
`;

export const ModalActionContainer = styled(Spacer)`
  justify-content: end;
`;

export const ModalDesc = styled.p`
  font-size: 1.4rem;
`;
