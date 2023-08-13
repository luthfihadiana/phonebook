import { Label, Spacer, Message } from "@/styles";
import { ColorSchemeType } from "@/types";
import { ReactNode } from "react";

type FormItemPropType = {
  name?: string,
  label?: string,
  message?: string,
  colorScheme?: ColorSchemeType,
  children: ReactNode,
  suffixElement?: ReactNode,
};

function FormItem({
  label,
  message,
  colorScheme,
  children,
  suffixElement,
}:FormItemPropType){
  return(
    <Spacer direction="column" size={0.8}>
      {label&& <Label colorScheme={colorScheme}>{label}</Label>}
      {suffixElement ? 
        <Spacer direction="row" size={0.8}>
          {children}
          {suffixElement}
        </Spacer>
      : children}
      {message && <Message colorScheme={colorScheme}>{message}</Message>}
    </Spacer>
  );
}

export default FormItem;