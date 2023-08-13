import Phone from "./Phone.type"

type ContactInput  = {
  id?: number,
  first_name?: string | null,
  last_name?: string | null,
  phones: {
    data: Phone[],
  }
}

export default ContactInput;