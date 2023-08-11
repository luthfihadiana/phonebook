import styled from "@emotion/styled";
type StyledIconsProps = {
  size?: number,
  color?: string,
}

export const StyledIcons = styled.span`
  font-size: ${({size}:StyledIconsProps) => size || 2}rem;
  color: ${({color}:StyledIconsProps)=> color || 'black'};
`;