import styled from "@emotion/styled";

type CardPropTypes = {
  clickable?: boolean,
}

const Card = styled.div`
  border: 1px solid #D8DEE3;
  border-radius: 0.5rem;
  padding: 0.8rem;
  box-shadow: 2px 2px 6px #D8DEE3;
  transition: 0.25s box-shadow ease-in;
  cursor: ${({clickable}:CardPropTypes)=> (clickable && 'pointer') || 'default'};
  ${({clickable}:CardPropTypes)=> (
    clickable && `&:hover{
      box-shadow: 5px 5px 6px #D8DEE3;
    }`
  ) || ''}
`;

export default Card;