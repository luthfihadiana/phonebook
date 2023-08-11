import styled from "@emotion/styled";

type SpacerPropTypes = {
  direction: 'row' | 'column',
  size?: number,
};

const Spacer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: ${({direction}:SpacerPropTypes)=>direction};
  & > *:not(:last-child){
    ${({direction,size}:SpacerPropTypes)=> 
      direction === 'row' 
      ? `margin-right: ${size||0.8}rem`
      : `margin-bottom: ${size||0.8}rem`
    }
  }
`;

export default Spacer;