import { ColorSchemeType } from "@/types";
import styled from "@emotion/styled";

type MessagePropTypes = {
  colorScheme?: ColorSchemeType,
};


const Message = styled.span`
  font-size: 1.2rem;
  color: ${({colorScheme}:MessagePropTypes) => `var(--${colorScheme||'default'})`};
`;

export default Message;