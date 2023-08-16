import { ContactFormDataType } from "@/types";
import * as yup from "yup";

const schema = yup.object({
  firstName: yup.string().required("You need fill first name").matches(/^[a-zA-Z0-9 ]+/, "You can't add special character"),
  lastName: yup.string().required("You need fill last name").matches(/^[a-zA-Z0-9 ]+/, "You can't add special character"),
  phoneNumbers: yup.array().of(yup.object({
    number: yup
      .string()
      .required("You need fill phone number")
      .matches(/^[0-9()-]+$/, 'You write wrong format')
      .test('test-unique',()=> 'Select another number', (val, context) => {
        const { path } = context;
        const regexIndex = path.match(/\[(\d+)\]/);
        if(!regexIndex) return true;
        const index = parseInt(regexIndex[1], 10);
        if (index === 0) {
          return true;
        }
        const parent = context?.from?.[1];
        if(parent){
          const {phoneNumbers}:ContactFormDataType = parent.value;
          const foundIndex = phoneNumbers.findIndex(el => el.number === val);
          if(foundIndex!== -1 && foundIndex !== index){
            return false;
          }
        }
        return true;
      }),
  }).required())
  .required()
  .min(1)
}).required();

export default schema;