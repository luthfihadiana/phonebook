import { Card, Spacer } from "@/styles";
import Icons from "../Icons";
import { ContactBadge, ContactImage, ContactItem, ContactNumber, ContactTitle } from "./index.styles";
import { ContactType } from "@/types";


type ContactPropTypes= {
  data: ContactType,
  isFavorite?: boolean,
  onClickDelete?: () => void,
  onClickStar?: () => void,
  onClickContact: () => void,
};

function Contact({
  data,
  isFavorite = false,
  onClickContact,
  onClickDelete,
  onClickStar,
}:ContactPropTypes){

  const {
    first_name,
    last_name,
    phones,
  } = data;

  const deleteHandler = (e: React.MouseEvent<Element, MouseEvent>) => {
    e.stopPropagation();
    if(onClickDelete) onClickDelete();
  }

  const favoriteHandler = (e: React.MouseEvent<Element, MouseEvent>) => {
    e.stopPropagation();
    if(onClickStar) onClickStar();
  }
  
  return(
    <Card clickable onClick={onClickContact}>
      <ContactItem>
        <ContactImage src={`https://icotar.com/initials/${encodeURI(first_name||'default')}.svg`}/>
        <div>
          <ContactTitle>{first_name} {last_name}</ContactTitle>
          {phones && 
            <Spacer direction="row">
              <ContactNumber>{phones[0].number}</ContactNumber>
              {phones.length>1 && <ContactBadge>{phones.length-1}+</ContactBadge>}
            </Spacer>
          }
        </div>
        <Spacer direction="row">
          <a onClick={deleteHandler}>
            <Icons name="delete" color="grey"/>
          </a>
          <a onClick={favoriteHandler}>
            <Icons name="star" color={isFavorite?"#FFEB3A":"grey"}/>
          </a>
        </Spacer>
      </ContactItem>
    </Card>
  );
}

export default Contact;