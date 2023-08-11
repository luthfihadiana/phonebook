import { StyledIcons } from "./index.styles";

type IconsProps = {
  name: string,
  size?: number,
  color?: string,
}

function Icons({
  name,
  size,
  color,
}:IconsProps){
  return(
    <StyledIcons className="material-icons" size={size} color={color}>
      {name}
    </StyledIcons>
  );
}

export default Icons;