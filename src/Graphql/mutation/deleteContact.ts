import { gql } from "@apollo/client";

const DELETE_CONTACT = gql`
  mutation deleteContact($id: Int!){
    delete_contact_by_pk(id: $id){
      id
      first_name
      last_name
    }
  }
`;

export default DELETE_CONTACT;