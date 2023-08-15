import { MouseEventHandler, ReactNode } from "react";
import { ModalActionContainer, ModalBackdrop, ModalCancelButton, ModalContainer, ModalContent, ModalDesc, ModalHeader, ModalTitle } from "./index.styles";
import { Icons } from "..";
import { Button } from "@/styles";

type ModalPropType = {
  visible: boolean,
  children?: ReactNode,
  title: string,
  onOk?: MouseEventHandler,
  onCancel?:MouseEventHandler,
  okButtonText?: string,
  cancelButtonText?: string,
  description?: string,
}

function Modal({
  visible,
  children,
  title,
  onOk,
  onCancel,
  okButtonText = 'Ok',
  cancelButtonText='Cancel',
  description,
}:ModalPropType){
  return(
    <ModalBackdrop hide={!visible}>
      <ModalContainer>
        <ModalHeader>
          <ModalTitle>{title}</ModalTitle>
          <ModalCancelButton onClick={onCancel}>
            <Icons name="clear" color="#D8DEE3"/>
          </ModalCancelButton>
        </ModalHeader>
        <ModalContent>
          {children||(description && <ModalDesc>{description}</ModalDesc>)}
        </ModalContent>
        <ModalActionContainer direction="row">
          {onOk && <Button colorScheme="success" onClick={onOk}>{okButtonText}</Button>}
          {onCancel&& <Button colorScheme="danger" onClick={onCancel}>{cancelButtonText}</Button>}
        </ModalActionContainer>
      </ModalContainer>
    </ModalBackdrop>
  );
}

export default Modal;