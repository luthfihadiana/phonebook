import { ColorSchemeType } from "@/types";
import styled from "@emotion/styled";

type LabelPropsTypes = {
  colorScheme?: ColorSchemeType,
};


const Label = styled.label`
  font-size: 1.4rem;
  color: ${({colorScheme}:LabelPropsTypes) => `var(--${colorScheme||'default'})`};
`;

export default Label;