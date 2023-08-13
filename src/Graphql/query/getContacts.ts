import { gql } from "@apollo/client";

const GET_CONTACTS = gql`
query getContact(
  $keyword:String="", 
  $offset:Int=0, 
  $limit:Int=10,
  $excludeIds:[Int!]=[],
) {
  contact_aggregate(
    where:{
      id: {_nin:$excludeIds},
      _or:[
        {first_name:{_iregex: $keyword}},
        {last_name:{_iregex:$keyword}},
        {phones:{number:{_iregex:$keyword}}}
      ]
    }
  ){
    aggregate{
      count
    }
  }
  contact(
    offset: $offset
    limit: $limit
    order_by:[{first_name:asc}]
    where:{
      id: {_nin:$excludeIds},
      _or:[
        {first_name:{_iregex: $keyword}},
        {last_name:{_iregex:$keyword}},
        {phones:{number:{_iregex:$keyword}}}
      ]
    }
  ){
    id
    first_name
    last_name
    phones{
      number
    }
  }
}
`;

export default GET_CONTACTS;