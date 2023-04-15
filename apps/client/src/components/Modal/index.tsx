import { MouseEvent } from "react";
import { createPortal } from "react-dom";
import { Close } from "@styled-icons/zondicons";
import * as Styled from "./styles";

type Props = {
  children: JSX.Element;
  onClose: (event: MouseEvent<HTMLElement>) => void;
};

export const Modal = (props: Props) => {
  const { children, onClose } = props;

  return createPortal(
    <Styled.Background>
      <Styled.Dialog>
        <Styled.X onClick={onClose}>
          <Close />
        </Styled.X>
        {children}
      </Styled.Dialog>
    </Styled.Background>,
    document.body
  );
};
