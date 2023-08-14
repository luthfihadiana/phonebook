import { ReactNode } from "react";
import { Centered, EmptyText, StyledList } from "./indes.styles";
import { LoadingIndicator } from "..";


type ListPropType = {
  children: ReactNode,
  loading: boolean,
  isEmpty: boolean,
};

function List({
  children,
  loading,
  isEmpty,
}:ListPropType){
  if(isEmpty){
    return(
      <Centered>
        <EmptyText>No data</EmptyText>
      </Centered>
    );
  }
  if(loading) {
    return(
      <Centered>
        <LoadingIndicator/>
      </Centered>
    );
  }
  return(
    <StyledList>
      {children}
    </StyledList>
  );
}

export default List;