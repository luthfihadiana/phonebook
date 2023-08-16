import {gql} from '@apollo/client';

const ADD_CONTACT = gql`
  mutation ADD_CONTACT($data: contact_insert_input!) {
    insert_contact_one(object: $data) {
      id
      first_name
      last_name
    }
  }
`;

export default ADD_CONTACT;