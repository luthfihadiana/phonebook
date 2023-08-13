import { gql } from "@apollo/client";

const GET_CONTACTS = gql`
  query getContact {
    contact(offset: 0, limit: 10) {
      id
      first_name
      last_name
      phones {
        number
      }
    }
  }
`;

export default GET_CONTACTS;