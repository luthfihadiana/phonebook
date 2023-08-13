import { ContactAggregate } from "."
import Contact from "./Contact.type"

type GetContactsResponse = {
  contact: Contact[],
  contact_aggregate:{
    aggregate : ContactAggregate
  }
}

export default GetContactsResponse;