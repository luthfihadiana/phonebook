import { gql } from "@apollo/client";

const GET_CONTACT_BY_IDS = gql`
query getContactByIds($ids:[Int!]!){
  contact(where:{
    id:{
      _in:$ids
    }
  }){
    id
    first_name
    last_name
    phones {
      number
    }
  }
}
`;

export default GET_CONTACT_BY_IDS;