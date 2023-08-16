import { gql } from "@apollo/client";

const GET_CONTACT = gql`
  query GET_CONTACT($id:Int!){
    contact_by_pk(id:$id){
      id
      first_name
      last_name
      phones {
        id
        number
      }
    }
  }
`;

export default GET_CONTACT;