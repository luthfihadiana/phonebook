import UPDATE_CONTACT from "@/Graphql/mutation/updateContact";
import { APIHandlerType, ContactFormDataType, ContactType, UpdateContactRequestType, UpdateContactResponseType } from "@/types";
import { useMutation } from "@apollo/client";
import useCheckExistingContact from "./useCheckExistingContact";
// import differenceBy from 'lodash.differenceby';

type UpdateContactParamsType = {
  data: ContactFormDataType, 
  idParams:string | undefined,
  handler:APIHandlerType,
  oldData: ContactType,
}

function useUpdateContact(){
  const [UpdateContactMutation, {loading: loadingUpdateContact}] = useMutation<UpdateContactResponseType,UpdateContactRequestType>(
    UPDATE_CONTACT,
    {
      refetchQueries:['GET_CONTACTS']
    }
  );

  const {checkContact, data} = useCheckExistingContact();

  const{
    loading: loadingCheckContact,
  } = data;

  const updateContact = async(
    {
      data,
      idParams,
      handler:{onSuccess, onError},
      oldData,
    }:UpdateContactParamsType,
  ) =>{
    const id = idParams ? parseInt(idParams) : null;
    if(!id || isNaN(id)) return;
    const nonUniqueData = await checkContact({
      firstName: data.firstName,
      lastName: data.lastName,
      phoneNumbers: data.phoneNumbers.map(phoneNumber => phoneNumber.number),
      excludeIds:[id],
    }, {
      onError,
      onSuccess: () => {},
    }) || {};
    if(Object.keys(nonUniqueData).length > 0) throw nonUniqueData;
    try{
      onSuccess();
      await UpdateContactMutation({
        variables:{
          id,
          firstName: data.firstName,
          lastName: data.lastName,
        }
      });
      console.log(oldData);
      // const newPhoneNumbers = data.phoneNumbers.filter(el => !el?.id);
      // const existingPhoneNumbers = data.phoneNumbers.filter(el=> el?.id);
      // const deletedPhoneNumber = differenceBy(oldData?.phones, existingPhoneNumbers, 'id');
    }catch(e){
      onError(e as Error);
    }
  }

  return {
    data: {
      loading: loadingUpdateContact || loadingCheckContact,
    },
    updateContact
  };
}

export default useUpdateContact;