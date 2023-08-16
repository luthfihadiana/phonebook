import { gql } from "@apollo/client";

const ADD_PHONE_NUMBERS = gql`
  mutation ADD_PHONE_NUMBERS($phones: [phone_insert_input!]!){
    insert_phone(objects: $phones){
      returning{
        id
      }
    }
  }
`;

export default ADD_PHONE_NUMBERS;