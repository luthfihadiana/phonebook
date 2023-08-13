import Phone from "./Phone.type";

type Contact = {
  id?: number,
  first_name?: string | null,
  last_name?: string | null,
  phones?: Phone[],
}

export default Contact;