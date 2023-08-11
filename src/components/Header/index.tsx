import { Button } from "@/styles";
import { useLocation, useNavigate } from "react-router-dom";
import { StyledContainer, StyledHeader, StyledLink, StyledSection } from "./index.styles";
import Icons from "../Icons";

function Header(){
  const navigate = useNavigate();
  const location = useLocation();
  return(
    <StyledHeader>
      <StyledContainer>
        <StyledSection>
          {location.pathname !== '/' && 
            <StyledLink onClick={()=>navigate(-1)}>
              <Icons name="arrow_back"/>
            </StyledLink>
          }
          <h1>
            Phonebook
          </h1>
        </StyledSection>
        {location.pathname === '/' 
        && <Button onClick={()=>navigate('/add-contact')}>
          <Icons name="add" color="white"/> Add Contact
        </Button>}
      </StyledContainer>
    </StyledHeader>
  );
}

export default Header;