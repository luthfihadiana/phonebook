import { gql } from "@apollo/client";

const UPDATE_CONTACT = gql`
  mutation UPDATE_CONTACT($id:Int!, $firstName:String!, $lastName:String!){
    update_contact_by_pk(
      _set:{
        first_name: $firstName,
        last_name:$lastName
      },
      pk_columns:{id: $id}
    ){
      id
    }
  }
`

export default UPDATE_CONTACT;