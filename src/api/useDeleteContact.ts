import DELETE_CONTACT from "@/Graphql/mutation/deleteContact";
import { DeleteContactRequestType, DeleteContactResponseType } from "@/types";
import { useMutation } from "@apollo/client";

function useDeleteContact(){
  const [DeleteContactMutation, {loading}] = useMutation<DeleteContactResponseType, DeleteContactRequestType>(
    DELETE_CONTACT,
    {
      refetchQueries:['GET_CONTACTS']
    }
  );

  const deleteContact = async (id: number) =>{
    try{
      await DeleteContactMutation({variables: {id}})
    }catch(e){
      console.error("error",e);
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