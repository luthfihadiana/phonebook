import * as yup from "yup";

export type PhoneNumber = {
  number: string,
}

export type AddContactSchemaData ={
  firstName: string,
  lastName: string,
  phoneNumbers: Array<PhoneNumber>,
};

const schema = yup.object({
  firstName: yup.string().required("You need fill first name"),
  lastName: yup.string().required("You need fill last name"),
  phoneNumbers: yup.array(yup.object({
    number: yup
      .string()
      .matches(/^[0-9()-]+$/,'You write wrong format')
      .required("You need fill phone number"),
  }).required()).required().min(1),
}).required();

export default schema;