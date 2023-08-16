import GET_CONTACT from "@/Graphql/query/getContact";
import { APIHandlerType, GetContactRequestType } from "@/types";
import GetContactResponse from "@/types/GetContactResponse.type";
import { useQuery } from "@apollo/client";

type useContactParam = {
  id?:number;
  onDemand?:boolean,
}

function useContact({
  id= -1,
  onDemand=true,
}:useContactParam){

  const {data, refetch, loading, error} = useQuery<GetContactResponse, GetContactRequestType>(
    GET_CONTACT,
    {
      skip: onDemand || id===-1,
      variables:{id},
    }
  );

  const getContact = async(variables:GetContactRequestType,{onSuccess =()=> {}, onError}:APIHandlerType) =>{
    try{
      const res = await refetch({...variables});
      onSuccess();
      return res.data.contact_by_pk;
    }catch(e){
      onError(e as Error);
    }
  }

  return{
    data:{
      loading,
      error,
      contact:data?.contact_by_pk
    },
    getContact,
  }
}

export default useContact;