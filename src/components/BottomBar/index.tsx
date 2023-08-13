import { ReactNode } from "react";
import { BottomBarContainer, BottomBarContent } from "./index.style";

type BottomBarPropType ={
  children: ReactNode,
}

function BottomBar({
  children,
}:BottomBarPropType){
  return (
    <BottomBarContainer>
      <BottomBarContent>
        {children}
      </BottomBarContent>
    </BottomBarContainer>
  );
}

export default BottomBar;