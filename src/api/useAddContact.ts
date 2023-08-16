import ADD_CONTACT from "@/Graphql/mutation/addContact";
import { APIHandlerType, AddContactRequestType, AddContactResponseType, ContactFormDataType } from "@/types";
import { useMutation } from "@apollo/client";
import useCheckExistingContact from "./useCheckExistingContact";

function useAddContact(){
  const [AddContactMutation, {loading: loadingAddContact}] = useMutation<AddContactResponseType, AddContactRequestType>(
    ADD_CONTACT,
    {
      refetchQueries:['GET_CONTACTS']
    }
  );
  const {checkContact, data} = useCheckExistingContact();

  const{
    loading: loadingCheckContact,
  } = data;

  const addContact = async (data: ContactFormDataType, {onSuccess, onError}:APIHandlerType) =>{
    const nonUniqueData = await checkContact({
      firstName: data.firstName,
      lastName: data.lastName,
      phoneNumbers: data.phoneNumbers.map(phoneNumber => phoneNumber.number),
    }, {
      onError,
      onSuccess: () => {},
    }) || {};
    if(Object.keys(nonUniqueData).length > 0) throw nonUniqueData;
    try{
      await AddContactMutation({
        variables: {
          data:{
            first_name: data?.firstName,
            last_name: data?.lastName,
            phones: {
              data: data?.phoneNumbers.map(phoneNumber => ({number: phoneNumber.number}))
            }
          }
        }
      })
      onSuccess();
    }catch(e){
      onError(e as Error);
    }
  }

  return{
    data: {
      loading: loadingAddContact || loadingCheckContact,
    },
    addContact,
  }
}

export default useAddContact;