import { Card, Spacer } from "@/styles";
import Icons from "../Icons";
import { ContactImage, ContactItem, ContactNumber } from "./index.styles";

type ContactData = {
  name: string,
  phoneNumber: string,
  id:string,
}

type ContactPropTypes= {
  data: ContactData,
  onClickDelete?: (id:string) => void,
  onClickStar?: (id:string) => void,
  onClickContact: (id:string) => void,
};

function Contact({
  data,
  onClickContact,
  onClickDelete,
  onClickStar,
}:ContactPropTypes){
  
  const {
    name,
    phoneNumber,
    id,
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
        <ContactImage src={`https://icotar.com/initials/${encodeURI(name)}.svg`}/>
        <div>
          <h3>{name}</h3>
          <ContactNumber>{phoneNumber}</ContactNumber>
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