import DELETE_CONTACT from "@/Graphql/mutation/deleteContact";
import { DeleteContactRequestType, DeleteContactResponseType } from "@/types";
import APIHandler from "@/types/APIHandler.type";
import { useMutation } from "@apollo/client";

function useDeleteContact(){
  const [DeleteContactMutation, {loading}] = useMutation<DeleteContactResponseType, DeleteContactRequestType>(
    DELETE_CONTACT,
  );

  const deleteContact = async (id: number, {onSuccess, onError}:APIHandler) =>{
    try{
      await DeleteContactMutation({variables: {id}});
      onSuccess();
    }catch(e){
      onError(e as Error);
    }
  }

  return{
    data:{
      loading,
    },
    deleteContact,
  }
}

export default useDeleteContact;