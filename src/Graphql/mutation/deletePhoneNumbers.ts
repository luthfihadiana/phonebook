import { gql } from "@apollo/client";

const DELETE_PHONE_NUMBERS = gql`
  mutation DELETE_PHONE_NUMBERS($ids: [Int!]!){
    delete_phone(where:{id:{_in:$ids}}){
      returning{
        id
      }
    }
  }
`;

export default DELETE_PHONE_NUMBERS;