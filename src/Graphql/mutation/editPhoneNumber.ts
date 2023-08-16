import { gql } from "@apollo/client";

const EDIT_PHONE_NUMBER = gql`
  mutation EDIT_PHONE_NUMBER($ids:phone_pk_columns_input!, $number:String!){
    update_phone_by_pk(_set:{number:$number}, pk_columns:$ids){
      id
    }
  }
`;

export default EDIT_PHONE_NUMBER;