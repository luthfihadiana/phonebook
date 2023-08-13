import { Card, Spacer } from "@/styles";
import Icons from "../Icons";
import { ContactBadge, ContactImage, ContactItem, ContactNumber, ContactTitle } from "./index.styles";
import { ContactType } from "@/types";


type ContactPropTypes= {
  data: ContactType,
  onClickDelete?: (id:number) => void,
  onClickStar?: (id:number) => void,
  onClickContact: (id:number) => void,
};

function Contact({
  data,
  onClickContact,
  onClickDelete,
  onClickStar,
}:ContactPropTypes){

  const {
    first_name,
    last_name,
    phones,
    id=0,
  } = data;

  const deleteHandler = (e: React.MouseEvent<Element, MouseEvent>) => {
    e.stopPropagation();
    if(onClickDelete) onClickDelete(id);
  }

  const favoriteHandler = (e: React.MouseEvent<Element, MouseEvent>) => {
    e.stopPropagation();
    if(onClickStar) onClickStar(id);
  }
  
  return(
    <Card clickable onClick={()=> onClickContact(id)}>
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
            <Icons name="star" color="grey"/>
          </a>
        </Spacer>
      </ContactItem>
    </Card>
  );
}

export default Contact;