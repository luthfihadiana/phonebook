import Phone from "./Phone.type";

type AddContactSchemaData ={
  firstName: string,
  lastName: string,
  phoneNumbers: Array<Phone>,
};

export default AddContactSchemaData;