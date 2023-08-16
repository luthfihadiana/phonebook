import { gql } from "@apollo/client";

const CHECK_EXISTING_CONTACT = gql`
  query CHECK_EXISTING_CONTACT(
    $firstName:String!,
    $lastName:String!,
    $phoneNumbers:[String!]!,
    $excludeIds:[Int!]=[],
  ){
    contact(
      where: {
        id: {_nin:$excludeIds},
        _or: [
          {
            first_name: {_eq: $firstName}, 
            last_name: {_eq: $lastName}
          },
          {
            phones: { number: { _in: $phoneNumbers } }
          }
        ]
      }
    ) {
      id
      first_name
      last_name
      phones {
        number
      }
    }
  }
`;

export default CHECK_EXISTING_CONTACT;